const sqlite3 = require('sqlite3').verbose();

// open database ProjectScript.db
let db = new sqlite3.Database('../../ProjectScripts.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


//regular search by searchID
function displaySearchesRegular(searchId) {
    let sql = `SELECT P.productID, P.name, P.company, P.price, A.score, R.score
    FROM Product P  
    LEFT JOIN BestBuyReview A ON P.productID = A.productID 
    LEFT JOIN AIReview R ON P.productID = A.productID 
            AND A.productID = R.productID
    WHERE P.searchID = ${searchId};`;
    db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200).json({ 'message': 'success', 'data': rows });
    });
}

// Display top X AI reviewed products from search by searchID
function displaySearchesWithTopAIScoreFilter(searchID, top) {
    let sql = `SELECT P.productID, P.name, P.company, P.price, A.score, R.score
    FROM Product P
    LEFT JOIN BestBuyReview A ON P.productID = A.productID
    LEFT JOIN AIReview R ON P.productID = A.productID
            AND A.productID = R.productID
    WHERE P.searchID = ${searchID}
    ORDER BY R.score DESC
    LIMIT ${top};`;
    db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200).json({ 'message': 'success', 'data': rows });
    });
}

// Display Searches by serchID orderby AiScore DESC
// based on user input
function displaySearchesWithAIScoreFilter(searchID) {
    let sql = `SELECT P.productID, P.name, P.company, P.price, A.score, R.score
    FROM Product P  LEFT JOIN BestBuyReview A ON P.productID = A.productID LEFT JOIN AIReview R ON P.productID = A.productID AND A.productID = R.productID
    WHERE P.searchID = ${searchID}
    ORDER BY R.score DESC;`;
    
    db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200).json({ 'message': 'success', 'data': rows });
    });
}

// Search by max price
// Should be changed to take user input
function displaySearchesWithMaxPriceFilter(searchID, maxPrice) {
    let sql = `SELECT P.productID, P.name, P.company, P.price, A.score, R.score
    FROM Product P  
    LEFT JOIN BestBuyReview A 
            ON P.productID = A.productID 
    LEFT JOIN AIReview R 
            ON P.productID = A.productID 
    AND A.productID = R.productID
    WHERE P.price <= ${maxPrice}
    AND p.searchID = ${searchID};`;

    db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200).json({ 'message': 'success', 'data': rows });
    });
}


// serach by max price and ordered by AI score desc
function displaySearchesWithMaxPriceAndAIScoreFilter(searchID, maxPrice) {
    let sql = `SELECT P.productID, P.name, P.company, P.price, A.score, R.score
    FROM Product P  LEFT JOIN BestBuyReview A ON P.productID = A.productID LEFT JOIN AIReview R ON P.productID = A.productID AND A.productID = R.productID
    WHERE P.searchID = ${searchID}
    AND P.price <= ${maxPrice}
    ORDER BY R.score DESC;`;
    db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.status(200).json({ 'message': 'success', 'data': rows });
    });
}

// code for testing if scripts work
    // db.all
    // (sql, [], (err, rows) => {
    //     if (err) {
    //         throw err;
    //     }
    //     rows.forEach((row) => {
    //         console.log(row);
    //     });
    // });



// displaySearchesWithMaxPriceAndAIScoreFilter(21, 1000);
// displaySearchesWithMaxPriceFilter(21, 10000000);
// displaySearchesRegular();
// displaySearchesWithTopAIScoreFilter(21, 3);




// close the database connection
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });