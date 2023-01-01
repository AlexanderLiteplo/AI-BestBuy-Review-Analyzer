const sqlite3 = require("sqlite3").verbose();

// open database ProjectScript.db

let db = new sqlite3.Database("../../ProjectScripts.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

// regular search by searchID
function displaySearchesRegular() {
  let sql = `SELECT U.username, U.country, S.search, P.name, P.price, P.company, AR.score, AI.score
    FROM User U NATURAL JOIN Searches S 
    NATURAL JOIN Product P 
    LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
    LEFT JOIN AIReview AI ON P.productID = AI.productID`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ message: "success", data: rows });
  });
}

// Select Searches 
function displaySearchesWithAIScoreFilter(aiScore) {
  let sql = `SELECT S.search, P.name, AVG(P.price), P.company, AVG(AI.score), AVG(AR.score), date
    FROM User U 
      NATURAL JOIN Searches S 
      NATURAL JOIN Product P 
      LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
      LEFT JOIN AIReview AI ON P.productID = AI.productID
    GROUP BY S.search
    HAVING AI.score >= ${aiScore}`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ message: "success", data: rows });
  });
}

// Display all searches but with no username column
// this query is needed to display on the search history page
function displaySearchesWithNoUserName() {
  let sql = `SELECT U.country, S.search, P.name, P.price, P.company, AR.score, AI.score
  FROM User U 
  NATURAL JOIN Searches S 
  NATURAL JOIN Product P 
  LEFT JOIN BestBuyReview AR 
    ON P.productID = AR.productID 
  LEFT JOIN AIReview AI 
    ON P.productID = AI.productID`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ message: "success", data: rows });
  });
}

// aggregation with group by:
// Find avg price and scores of different searches
function displaySearchesWithAggregationOnSearch() {
  let sql = `SELECT S.search, AVG(P.price), AVG(AR.score), AVG(AI.score)
  FROM Searches S 
  NATURAL JOIN Product P 
  LEFT JOIN BestBuyReview AR 
    ON P.productID = AR.productID 
  LEFT JOIN AIReview AI 
    ON P.productID = AI.productID
  GROUP BY S.search;`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ message: "success", data: rows });
  });
}

// Find the AVG price and Review scores of
// searches that have been made more than once
// nested aggreation with group by
function displaySearchesThatHaveBeenMadeMultipleTimes() {
  let sql = `SELECT S.search, AVG(P.price), AVG(AR.score), AVG(AI.score)
  FROM Searches S 
  NATURAL JOIN Product P 
  LEFT JOIN BestBuyReview AR 
    ON P.productID = AR.productID 
  LEFT JOIN AIReview AI 
    ON P.productID = AI.productID
  WHERE P.searchID IN (SELECT S1.searchID
            FROM Searches S1
            GROUP BY S1.search
            HAVING COUNT(*) > 1)
  GROUP BY S.Search;`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ message: "success", data: rows });
  });
}

// Division Query:
// Find searches that have been made in all countries
function displaySearchesMadeInAllCountries() {
  let sql1 = 'DROP VIEW IF EXISTS Division;';
  let sql2 = `CREATE VIEW Division AS
    SELECT U.username, S.search, U.country
    FROM User U LEFT JOIN Searches S ON U.username = S.username;`;
  let sql3 = `SELECT DISTINCT D.Search
  FROM Division D
  WHERE NOT EXISTS (SELECT U1.country
                      FROM User U1
                      EXCEPT
                      SELECT D1.country
                      FROM Division D1
                      WHERE D1.search = D.search);`;
  
  db.run(sql1, [], (err) => {
    if (err) {
      throw err;
    }
  });
  // ARYAN TODO make sure above has executed before running this
  db.run(sql2, [], (err) => {
    if (err) { 
      throw err;
    }
  });
  // ARYAN TODO make sure above has executed before running this
  db.all(sql3, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ message: "success", data: rows });
  });
}

// Tests:
// displaySearchesRegular();
// displaySearchesWithAIScoreFilter();
// displaySearchesWithAggregationOnSearch();
// displaySearchesWithNestedAggregationOnSearch();

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
