const sqlite3 = require('sqlite3').verbose();
// import sleep library function
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}




 // Search logic
    async function onUserSearch(search, username) {
        
        let searchID = generateSearchID();

        

        writeSearchToSearchesTable(search, searchID, username);

        // ARYAN TODO BESTBUY API CALL GOES HERE
            // return an array product objects that 
            // Array of product[i] = {productID, price, name, searchID, company, bestBuyReviewScore, aiReviewScore}
        var productArray = [{productID: 100,
                             price: 100,
                              name: "product1",
                               searchID: searchID,
                                company: "company1",
                                 bestBuyReviewScore: 4.2,
                                  aiReviewScore: 3.1},
                            ];

        // Write to Product: (productID, productName, price, name, searchID, company)
        // Write to AIReview( reviewID, dateGenerated, algorithm (just name of ai), score, productID)
        // Write to BestBuyReview: (reviewID, score, ReviewerName, dateReviewed, productID)
        for (const element of productArray) {
            // Write to Product table productID, price, name, searchID, company
            await writeProductToProductTable(element, searchID);
            let reviewID = searchID + element.productID;
            
            await addAIReview(reviewID,
                        'ML_Alrogithm',
                        element.aiReviewScore,
                        element.productID);
            
            await addBestBuyReview(reviewID,
                            element.bestBuyReviewScore,
                            'BestBuy',
                            element.productID);
        }

        // ARYAN TODO CALL METHOD THAT TRIGGERS DISPLAY OF SEARCH RESULTS TO USER
        // send searchID to front end
    }

    //Testing:


     // //print contents of Searches table
    function printSearchesTable() {
        let sql = `SELECT * FROM Searches`;
        db.all
        (sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log(row);
            });
        });
    }
    // print contents of Products table
    function printProductsTable() {
        let sql = `SELECT * FROM Products`;
        db.all
        (sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log(row);
            });
        });
    }
    // print contents of AIReview table
    function printAIReviewTable() {
        let sql = `SELECT * FROM AIReview`;
        db.all
        (sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log(row);
            });
        });
    }
    // print contents of BestBuyReview table
    function printBestBuyReviewTable() {
        let sql = `SELECT * FROM BestBuyReview`;
        db.all
        (sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log(row);
            });
        });
    }

main();

    //create main function
    async function main() {

    let db = new sqlite3.Database('../../ProjectScripts.db', (err) => {
        if (err) {
            console.error(err.message);
            console.log("could not connect")
        }
        console.log('Connected to the ProjectScript database.');
    });
    //sleep for 1 second
    await sleep(1000);
    console.log(await generateSearchID(db));
    //print contents of Searches table
    // printSearchesTable();
    //print contents of Products table
    // printProductsTable();
    //print contents of AIReview table
    // printAIReviewTable();
    //print contents of BestBuyReview table
    // printBestBuyReviewTable();
    // close the database connection

    await db.close((err) => {
        if (err) {
        return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}
    // onUserSearch("search", "xanderminer");
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    // console.log("Printing Searches Table");
    // printSearchesTable();
    // console.log("Printing Products Table");
    // printProductsTable();
    // console.log("Printing aireview Table");
    // printAIReviewTable();
    // console.log("Printing BestBuyReviews Table");
    // printBestBuyReviewTable();

    function addBestBuyReview(reviewID, score, reviewerName, productID) {
        var dateReviewed = new Date();
        var dd = String(dateReviewed.getDate()).padStart(2, "0");
        var mm = String(dateReviewed.getMonth() + 1).padStart(2, "0");
        var yyyy = dateReviewed.getFullYear();
        dateReviewed = yyyy + "-" + mm + "-" + dd;
      
        let sql = `INSERT INTO BestBuyReview(reviewID, score, ReviewerName, dateReviewed, productID)
                  VALUES('${reviewID}', '${score}', '${reviewerName}', '${dateReviewed}', '${productID}' )`;
        
        
        db.all(sql, [], (err, rows) => {
          if (err) {
            throw err;
          }
          res.status(200).json({ message: "success", data: rows });
        });
      }
      
      
      function addAIReview(reviewID, algorithmName, score, ProductID) {
        var dateGenerated = new Date();
        var dd = String(dateGenerated.getDate()).padStart(2, "0");
        var mm = String(dateGenerated.getMonth() + 1).padStart(2, "0");
        var yyyy = dateGenerated.getFullYear();
        dateGenerated = yyyy + "-" + mm + "-" + dd;
      
        console.log(dateGenerated);
      
      
        let sql = `INSERT INTO AIReview(reviewID,  dateGenerated, algorithm,  score,  productID)
                VALUES('${reviewID}', ${dateGenerated}, '${algorithmName}','${score}', '${ProductID}' )`;
      
        db.all(sql, [], (err, rows) => {
          if (err) {
            throw err;
          }
          res.status(200).json({ message: "success", data: rows });
        });
      }

    function writeProductToProductTable(product, searchID) {
        // Write to Product table productID, price, name, searchID, company
        let sql = `INSERT INTO Products (productID, price, name, searchID, company) 
                    VALUES (${product.productID}, ${product.price}, '${product.name}', ${searchID}, '${product.company}');`;
        db.all
        (sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log(row);
            });
        });
    }

    function writeSearchToSearchesTable(search, searchID, username) {
        // Write to searches table "Search, username, SearchID, Date"
        // get todays date as a sql date
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       
        let sql = `INSERT INTO Searches (searchID, search, date, username) 
                    VALUES (${searchID}, '${search}', ${date}, '${username}');`;
        db.all
        (sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log(row);
            });
        });
    }

    //test writeSearchToSearchesTable("test", 1, "test");
    // writeSearchToSearchesTable("test", 1000, "xanderminer");
   


    async function generateSearchID(db) {
        // Make query that finds highest searchID and then add 1 to that
        let sql = `SELECT MAX(searchID) FROM Searches;`;
        console.log("Generating Search ID");
        let searchID = await db.all
        (sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                return row;
            });
        });
        console.log("AT THE END OF GENERATE SEARCH ID");
        console.log("Search ID is: " + searchID['MAX(searchID)'] + 1);
        return searchID['MAX(searchID)'] + 1;
    }





