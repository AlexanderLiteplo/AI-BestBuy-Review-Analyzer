const sqlite3 = require("sqlite3").verbose();

// open database ProjectScript.db
let db = new sqlite3.Database("../../ProjectScripts.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

function addBestBuyReview(reviewID, score, reviewerName, productID) {
  var dateReviewed = new Date();
  var dd = String(dateReviewed.getDate()).padStart(2, "0");
  var mm = String(dateReviewed.getMonth() + 1).padStart(2, "0");
  var yyyy = dateReviewed.getFullYear();
  dateReviewed = yyyy + "-" + mm + "-" + dd;

  let sql = `INSERT INTO BestBuyReview(reviewID, score,
                                       ReviewerName, dateReviewed, productID)
            VALUES('${reviewID}', '${score}',
                   '${reviewerName}', '${dateReviewed}', '${productID}' )`;
  
  
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


  let sql = `INSERT INTO AIReview(reviewID,  dateGenerated,
                                  algorithm,  score,  productID)
          VALUES('${reviewID}', ${dateGenerated},
                '${algorithmName}','${score}', '${ProductID}' )`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ message: "success", data: rows });
  });
}




//print contents of ai reivew table for testing
function printAIReview() {
  let sql = `SELECT * FROM AIReview`;
  db.all(sql
    , [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row);
      });
    });
}


// print contents of best buy review table for testing
function printBestBuyReview() {
  let sql = `SELECT * FROM BestBuyReview`;
  db.all(sql
    , [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row);
      });
    });
}


// printAIReview();
// addBestBuyReview(101, 4.5, 'BestBuy', 1);
// printBestBuyReview();



// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
