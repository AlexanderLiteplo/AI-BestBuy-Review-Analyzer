const bbuy = require('bestbuy')('Gtg0uuhjhMLfnLcel5GtKj40');
const request = require('request');

const puppeteer = require('puppeteer');
const baseURL = 'http://www.bestbuy.com/site/reviews/-/';
const UserAgent = require('user-agents');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
const normalize = require('array-normalize')
const db =  require('../config/dbConn');




const getProducts = async (req, res) => {
    try {
        query = req?.body?.search?.split(' ').join('&search=');
        const products = await bbuy.products(`search=${query}`, { show: 'sku,name,salePrice,shortDescription,image,thumbnailImage,manufacturer,addToCartUrl,regularPrice,onlineAvailability,shippingCost,shipping,', 
                                                pageSize: 10, page: 1,  
        sort: 'bestSellingRank.desc'
    });
    
        res.json(products);
    } catch (error) {
        res.status(200).json({ message: String(error) });
    }
};

const getProductinfo = async (req, res) => {
    var skus = req?.body?.products;
    console.log("here are skus : " + skus);
    if (!skus) return res.status(400).json({ "message": 'Product IDs required' });

    var Scores = {};
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    await Promise.all(skus.map(async (sku) => {
        try{
            const url = baseURL+sku;
            const page = await browser.newPage();
            const userAgent = new UserAgent({ deviceCategory: 'desktop' });
            await page.setRequestInterception(true);
            await page.setExtraHTTPHeaders({
                'user-agent': userAgent.toString(),
                'upgrade-insecure-requests': '1',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9,en;q=0.8'
            })

            // page.once('load', () => console.log('Page loaded!'))
            // page.on('error', err => console.log(err))
            page.on('request', (req) => {
                if (
                req.resourceType() == 'stylesheet' ||
                req.resourceType() == 'font' ||
                req.resourceType() == 'image' ||
                    req.resourceType() == 'script' ||
                    req.resourceType() == 'link'
                ) {
                req.abort();
                } else {
                req.continue();
                }
            });

            await page.goto(url,{
                waitUntil: 'load',
                timeout: 15000
            });

            const reviews = await page.evaluate(() => {
                const reviews = document.querySelectorAll('div.ugc-review-body');
                return Array.from(reviews).map(review => review.textContent);
            });
            const sentimentscoreArr = Array.from(reviews).map(review => sentiment.analyze(review).score);
            const min = Math.min(...sentimentscoreArr);
            const adjustedSentimentScore = sentimentscoreArr.map(score => score - min);

            const normalizedSentimentScore = normalize(adjustedSentimentScore);
            const sum = normalizedSentimentScore.reduce((a, b) => a + b, 0);
            const sentimentScore = (sum / normalizedSentimentScore.length) || 0;
            const ratings = await page.evaluate(() => {
                const ratings = document.querySelectorAll('div.ugc-rating-stars-v3');
                return Array.from(ratings).map(rating => rating.textContent);
            });
            console.log(ratings);
            console.log("Sentiment Score: " + sentimentScore);
            if(ratings.length != 0){
                
            Scores[sku] = {
                "sentimentScore": sentimentScore*5,
                "ratings": ratings[0]
            }
        } else {
            Scores[sku] = {
                "sentimentScore": 0,
                "ratings": "No reviews for the product"
            }
        }
        }catch(err){
            console.log("Error Occcured : " + err);
            Scores[sku] = {
                    "sentimentScore": 0,
                    "ratings": "Scraping failed"
                }
        }
    })).then(() => {
        res.status(200).json(Scores);
    });
    await browser.close();
};

const insertProduct = async (req, res) => {
    try {
        const username = req?.body?.username;
        const search = req?.body?.search;
        const productArray = req?.body?.products;
        const searchID = await generateSearchID();
        
        console.log("Search ID : " + searchID);
        
        writeSearchToSearchesTable(search, searchID, username);
        
        await Promise.all(productArray.map(async (product) => {
            const reviewID = parseInt(String(searchID) + String(product.productID));
            product.productID = reviewID;
            await writeProductToProductTable(product, searchID);

            
            await addAIReview(reviewID,
                        'ML_Alrogithm',
                        product.aiReviewScore,
                        product.productID);

            await addBestBuyReview(reviewID,
                            product.bestBuyReviewScore,
                            'BestBuy',
                            product.productID);

        }));
        res.status(200).json({ "message": "Success", "searchID" : searchID });
    }
    catch (error) {
        res.status(200).json({ message: String(error) });
    }
};


async function generateSearchID() {
    let sql = `SELECT MAX(searchID) FROM Searches;`;
    let searchID = await db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        return rows;
    });
    return searchID[0]['MAX(searchID)'] + 1;
}

async function writeSearchToSearchesTable(search, searchID, username) {
    console.log("Writing Search to Searches Table");

    console.log("Search: " + search + " SearchID: " + searchID + " Username: " + username);


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    console.log("Date: " + today);
    let sql = `INSERT INTO Searches (searchID, search, searchDate, username) 
                VALUES (${searchID}, '${search}', ${today}, '${username}');`;
    await db.all
    (sql, [], (err, rows) => {
        if (err) {
            console.log(err);
            throw err;
        }
        rows.forEach((row) => {
            console.log("Search written to Searches table");
            console.log(row);
        });
    });
    return;
}

async function writeProductToProductTable(product, searchID) {
    // var pid = parseInt(String(product.productID) + String(searchID));
    let sql = `INSERT INTO Product (productID, price, name, searchID, company) 
                VALUES (${product.productID}, ${product.price}, '${product.name}', ${searchID}, '${product.company}');`;
    return await db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });
}


async function addBestBuyReview(reviewID, score, reviewerName, productID) {
    var dateReviewed = new Date();
    var dd = String(dateReviewed.getDate()).padStart(2, "0");
    var mm = String(dateReviewed.getMonth() + 1).padStart(2, "0");
    var yyyy = dateReviewed.getFullYear();
    dateReviewed = yyyy + "-" + mm + "-" + dd;
  
    let sql = `INSERT INTO BestBuyReview (reviewID, score, ReviewerName, dateReviewed, productID)
              VALUES('${reviewID}', '${score}', '${reviewerName}', '${dateReviewed}', '${productID}' )`;
    
    return await db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row);
        });
    });
}
  
  
async function addAIReview(reviewID, algorithmName, score, ProductID) {
    var dateGenerated = new Date();
    var dd = String(dateGenerated.getDate()).padStart(2, "0");
    var mm = String(dateGenerated.getMonth() + 1).padStart(2, "0");
    var yyyy = dateGenerated.getFullYear();
    dateGenerated = yyyy + "-" + mm + "-" + dd;
  
  
  
    let sql = `INSERT INTO AIReview(reviewID,  dateGenerated, algorithm,  score,  productID)
            VALUES('${reviewID}', ${dateGenerated}, '${algorithmName}','${score}', '${ProductID}' )`;
  
    return await db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row);
        });
    });
}



const addToCart = async (req, res) => {
    var username = req?.body?.username;
    var pID = req?.body?.productID;

    var sql = await generateSearchID() - 1;

    var productID = parseInt(String(sql) + String(pID));




    let sql0 = `SELECT * FROM CartContainsProduct WHERE username = '${username}' AND productID = '${productID}'`;
    let isInCartAlready = await db.all(sql0
    , [], (err, rows) => {
        if (err) {
        throw err;
        }
        return rows;
    });

    const isInCart = isInCartAlready.length>0;
    console.log("isInCart ================ " + isInCart);

    if(!isInCart) {
      let sql = `SELECT cartID FROM Cart WHERE username = '${username}';`;
      let cID = await db.all
      (sql, [], (err, rows) => {
          if (err) {
              throw err;
          }
          return rows;
      });
    //   return cartID[0]['cartID'];
      var cartID = cID[0]['cartID'];
      let sql2 = `INSERT INTO CartContainsProduct (cartID, username, productID) VALUES ('${cartID}', '${username}', '${productID}');`;
      await db.all
        (sql2, [], (err, rows) => {
          if (err) {
            throw err;
          }
          rows.forEach((row) => {
            console.log(row);
          });
        });
    }    
    else {
      console.log("Cart already contains product");
      return res.status(200).send("Cart already contains product");
    }
    return res.send("Product added to cart");
}


//=======================================Side bar functions=======================================


const filterProducts = async (req, res) => {
    var searchID = req?.query?.search_ID? req?.query?.search_ID : "";
    var topXfilter = req?.query?.topXProduct? req?.query?.topXProduct : "";
    var maxPriceFilter = req?.query?.maxPriceFilter? req?.query?.maxPriceFilter: "";
    var orderbyAI = req?.query?.orderByAI == 'true' ? true: "";

    var result = [];
    console.log("searchID: " + searchID + " topXfilter: " + topXfilter + " maxPriceFilter: " + maxPriceFilter + " orderbyAI: " + orderbyAI);
    try{
        if(topXfilter != '') {
            result = await displaySearchesWithTopAIScoreFilter(searchID, topXfilter);
        }
        else if(maxPriceFilter != '' && orderbyAI != '') {
            result = await displaySearchesWithMaxPriceAndAIScoreFilter(searchID, maxPriceFilter);
        }
        else if(maxPriceFilter != '') {
            result = await displaySearchesWithMaxPriceFilter(searchID, maxPriceFilter);
        }
        else if(orderbyAI != '') {
            result = await displaySearchesWithAIScoreFilter(searchID);
        }else{
            console.log("I will get executed by default");
            result = await displaySearchesRegular(searchID);
        }
        // console.log(result);
        return res.send(result);
    }
    catch(err) {
        console.log(err);
        return res.status(500).send
        ("Error in filterProducts: " + err);
    }
}



async function displaySearchesRegular(searchID) {
    let sql = `SELECT P.productID, P.name, P.price, B.score as bestBuyReviewScore, A.score as aiReviewScore
    FROM Product P  
    LEFT JOIN BestBuyReview B 
            ON P.productID = B.productID 
    LEFT JOIN AIReview A 
            ON P.productID = A.productID 
            AND B.productID = A.productID
    WHERE P.searchID = ${searchID};`;
    return await db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        return rows;
    });
}

// Display top X AI reviewed products from search by searchID
async function displaySearchesWithTopAIScoreFilter(searchID, top) {
    let sql = `SELECT P.productID, P.name, P.price, B.score as bestBuyReviewScore, A.score as aiReviewScore
    FROM Product P  
    LEFT JOIN BestBuyReview B 
            ON P.productID = B.productID 
    LEFT JOIN AIReview A 
            ON P.productID = A.productID 
            AND B.productID = A.productID
    WHERE P.searchID = ${searchID}
    ORDER BY A.score DESC
    LIMIT ${top};`;
    return await db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        return rows;
    });
}

// Display Searches by serchID orderby AiScore DESC
// based on user input
async function displaySearchesWithAIScoreFilter(searchID) {
    let sql = `SELECT P.productID, P.name, P.price, B.score as bestBuyReviewScore, A.score as aiReviewScore
    FROM Product P  
    LEFT JOIN BestBuyReview B 
            ON P.productID = B.productID 
    LEFT JOIN AIReview A 
            ON P.productID = A.productID 
            AND B.productID = A.productID
    WHERE P.searchID = ${searchID}
    ORDER BY A.score DESC;`;
    // return output of sql
    return await db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        return rows;
    });
}

// Search by max price
// Should be changed to take user input
async function displaySearchesWithMaxPriceFilter(searchID, maxPrice) {
    let sql = `SELECT P.productID, P.name, P.price, B.score as bestBuyReviewScore, A.score as aiReviewScore
    FROM Product P  
    LEFT JOIN BestBuyReview B 
            ON P.productID = B.productID 
    LEFT JOIN AIReview A 
            ON P.productID = A.productID 
            AND B.productID = A.productID
    WHERE P.price <= ${maxPrice}
    AND P.searchID = ${searchID};`;


    return await db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        return rows;
    });
}


// serach by max price and ordered by AI score desc
async function displaySearchesWithMaxPriceAndAIScoreFilter(searchID, maxPrice) {
    let sql = `SELECT P.productID, P.name, P.price, B.score as bestBuyReviewScore, A.score as aiReviewScore
    FROM Product P  
    LEFT JOIN BestBuyReview B 
            ON P.productID = B.productID 
    LEFT JOIN AIReview A 
            ON P.productID = A.productID 
            AND B.productID = A.productID
    WHERE P.searchID = ${searchID}
    AND P.price <= ${maxPrice}
    ORDER BY A.score DESC;`;
    return await db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        return rows;
    });
}


module.exports = {
    getProducts,
    getProductinfo,
    insertProduct,
    addToCart,
    filterProducts
}