const db =  require('../config/dbConn');


async function hideColumnsLogic(req,res) {
  var {hideUsernameChecked,hideCountryChecked, hidePriceChecked} = req?.query;
  console.log(hideUsernameChecked,hideCountryChecked, hidePriceChecked);
  var result;
  hideUsernameChecked = hideUsernameChecked === 'true';
  hideCountryChecked = hideCountryChecked === 'true';
  hidePriceChecked = hidePriceChecked === 'true';
  try{
    if (hidePriceChecked && hideUsernameChecked && hideCountryChecked) {
      console.log("no price, no username, no country");
      result = await displaySearchesNoPriceAndNoUsernameAndNoCountry();
    }
    else if (hidePriceChecked && hideUsernameChecked && !hideCountryChecked) {
      result = await displaySearchesNoPriceAndNoUsername();
    }
    else if (hidePriceChecked && hideCountryChecked && !hideUsernameChecked) {
      result = await displaySearchesNoPriceAndNoCountry();
    }
    else if (hideUsernameChecked && hideCountryChecked && !hidePriceChecked) {
      result = await displayNoUsernameAndNoCountry();
    }
    else if (hidePriceChecked && !hideUsernameChecked && !hideCountryChecked) {
      result = await displaySearchesNoPrice();
    }
    else if (hideUsernameChecked && !hidePriceChecked && !hideCountryChecked) {
      result = await displaySearchesNoUserName();
    }
    else if (hideCountryChecked && !hidePriceChecked && !hideUsernameChecked) {
      result = await displaySearchesNoCountry();
    }
    else {
      result = await displayAllFields();
    }
    return res.status(200).send(result);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ 'message': err.message });
  }
}

const displaySearchesWithAIScoreFilter = async (req, res) => {
  const filter = req?.query?.filter;
  console.log(filter);
  try {
    
      let sql = `SELECT S.search,
                  AVG(P.price),
                  AVG(AI.score) as aiReviewScore,
                  AVG(AR.score) as bestBuyReviewScore,
                  S.searchDate
            FROM Searches S
            LEFT JOIN Product P  ON P.searchID = S.searchID
            LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
            LEFT JOIN AIReview AI ON P.productID = AI.productID
            GROUP BY S.search
            HAVING AI.score >= ${filter}`;

      const result = await db.all
      (sql, [], (err, rows) => {
          if (err) {
              throw err;
          }
          return rows;
      });
      console.log(result);
      res.status(200).send(result);
      } catch (err) {
        console.log(err);
          res.status(500).json({ 'message': err.message });
      }
}

const displayAllFields = async (req, res) =>  {
  let sql = `SELECT U.username,
              U.country,
              S.search, P.name,
              P.price, P.company,
              AR.score as bestBuyReviewScore,
              AI.score as aiReviewScore,
              S.searchDate as date
    FROM User U NATURAL JOIN Searches S 
    NATURAL JOIN Product P 
    LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
    LEFT JOIN AIReview AI ON P.productID = AI.productID`;
    
    const result = await db.all
      (sql, [], (err, rows) => {
          if (err) {
              throw err;
          }
          return rows;
      });
    return result;
}


// regular search by searchID
const displaySearchesRegular = async (req, res) =>  {
    let sql = `SELECT U.username,
                U.country,
                S.search, P.name,
                P.price, P.company,
                AR.score as bestBuyReviewScore,
                AI.score as aiReviewScore,
                S.searchDate as date
      FROM User U NATURAL JOIN Searches S 
      NATURAL JOIN Product P 
      LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
      LEFT JOIN AIReview AI ON P.productID = AI.productID`;
      
      const result = await db.all
        (sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            return rows;
        });
      return res.status(200).send(result);
  }

  const displaySearchesNoCountry = async (req, res) =>  {
    let sql = `SELECT U.username,
                S.search, P.name,
                P.price, P.company,
                AR.score as bestBuyReviewScore,
                AI.score as aiReviewScore,
                S.searchDate as date
      FROM User U NATURAL JOIN Searches S 
      NATURAL JOIN Product P 
      LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
      LEFT JOIN AIReview AI ON P.productID = AI.productID`;

        const result = await db.all
          (sql, [], (err, rows) => {
              if (err) {
                  throw err;
              }
              return rows;
          });
          return result;          
  }

  const displaySearchesNoPrice = async (req, res) =>  {
    let sql = `SELECT U.username,
                U.country,
                S.search, P.name,
                P.company,
                AR.score as bestBuyReviewScore,
                AI.score as aiReviewScore,
                S.searchDate as date
      FROM User U NATURAL JOIN Searches S 
      NATURAL JOIN Product P 
      LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
      LEFT JOIN AIReview AI ON P.productID = AI.productID`;
      
        const result = await db.all
          (sql, [], (err, rows) => {
              if (err) {
                  throw err;
              }
              return rows;
          });
          return result;          
  }

  const displaySearchesNoPriceAndNoUsername = async (req, res) =>  {
    let sql = `SELECT 
                U.country,
                S.search, P.name,
                P.company,
                AR.score as bestBuyReviewScore,
                AI.score as aiReviewScore,
                S.searchDate as date
      FROM User U NATURAL JOIN Searches S 
      NATURAL JOIN Product P 
      LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
      LEFT JOIN AIReview AI ON P.productID = AI.productID`;

        const result = await db.all
          (sql, [], (err, rows) => {
              if (err) {
                  throw err;
              }
              return rows;
          });
          return result;          
          
  }

  const displaySearchesNoPriceAndNoUsernameAndNoCountry = async (req, res) =>  {
    let sql = `SELECT
                S.search, P.name,
                P.company,
                AR.score as bestBuyReviewScore,
                AI.score as aiReviewScore,
                S.searchDate as date
      FROM User U NATURAL JOIN Searches S 
      NATURAL JOIN Product P 
      LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
      LEFT JOIN AIReview AI ON P.productID = AI.productID`;

        const result = await db.all
          (sql, [], (err, rows) => {
              if (err) {
                  throw err;
              }
              return rows;
          });
          return result;          
          }

  const displaySearchesNoPriceAndNoCountry = async (req, res) =>  {
    let sql = `SELECT U.username,
                S.search, P.name,
                P.company,
                AR.score as bestBuyReviewScore,
                AI.score as aiReviewScore,
                S.searchDate as date
      FROM User U NATURAL JOIN Searches S 
      NATURAL JOIN Product P 
      LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
      LEFT JOIN AIReview AI ON P.productID = AI.productID`;

        const result = await db.all
          (sql, [], (err, rows) => {
              if (err) {
                  throw err;
              }
              return rows;
          });
          return result;          
          
  }

  const displayNoUsernameAndNoCountry = async (req, res) =>  {
    let sql = `SELECT P.price,
                S.search, P.name,
                P.company,
                AR.score as bestBuyReviewScore,
                AI.score as aiReviewScore,
                S.searchDate as date
      FROM User U NATURAL JOIN Searches S 
      NATURAL JOIN Product P 
      LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
      LEFT JOIN AIReview AI ON P.productID = AI.productID`;

        const result = await db.all
          (sql, [], (err, rows) => {
              if (err) {
                  throw err;
              }
              return rows;
          });
          return result;          
          
  }



  // Display all searches but with no username column
  // this query is needed to display on the search history page
  // hide username checkbox
const displaySearchesNoUserName = async (req, res) =>  {
    let sql = `SELECT U.country,
                S.search, P.name,
                P.price, P.company,
                AR.score as bestBuyReviewScore,
                AI.score as aiReviewScore,
                S.searchDate as date
    FROM User U 
    NATURAL JOIN Searches S 
    NATURAL JOIN Product P 
    LEFT JOIN BestBuyReview AR 
      ON P.productID = AR.productID 
    LEFT JOIN AIReview AI 
      ON P.productID = AI.productID`;

        const result = await db.all
          (sql, [], (err, rows) => {
              if (err) {
                  throw err;
              }
              return rows;
          });
          return result;          
          
}

  // aggregation with group by:
// Find avg price and scores of different searches
// Button named: "Display Searches"
const displaySearchesWithAggregationOnSearch = async (req, res) =>  {
    let sql = `SELECT S.search,
                AVG(P.price) as price,
                AVG(AR.score) as bestBuyReviewScore,
                AVG(AI.score) as aiReviewScore
    FROM Searches S 
    NATURAL JOIN Product P 
    LEFT JOIN BestBuyReview AR 
      ON P.productID = AR.productID 
    LEFT JOIN AIReview AI 
      ON P.productID = AI.productID
    GROUP BY S.search;`;
    try {
    const result = await db.all
      (sql, [], (err, rows) => {
          if (err) {
              throw err;
          }
          return rows;
      });
      // console.log(result);
      res.status(200).send(result);
      } catch (err) {
        console.log(err);
          res.status(500).json({ 'message': err.message });
      }
  }

  // Find the AVG price and Review scores of
// searches that have been made more than once
// nested aggreation with group by
//button named: "Display Searches made multiple times"
const displaySearchesThatHaveBeenMadeMultipleTimes = async (req, res) =>  {
    let sql = `SELECT S.search,
                AVG(P.price) as price,
                AVG(AR.score) as bestBuyReviewScore, 
                AVG(AI.score) as aiReviewScore
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
    try {
      const result = await db.all
        (sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            return rows;
        });
        console.log(result);
        res.status(200).send(result);
        } catch (err) {
          console.log(err);
            res.status(500).json({ 'message': err.message });
      }
  }

  // Division Query:
// Find searches that have been made in all countries
const displaySearchesMadeInAllCountries = async (req, res) =>  {
  try{
    await runDropViewQuery();
    await runCreateViewQuery();
    var result = await runDivisionQuery();

    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ 'message': err.message });
  }
}

async function runDropViewQuery() {
  let sql1 = 'DROP VIEW IF EXISTS Division;';

  return await db.run(sql1, [], (err) => {
    if (err) {
      throw err;
    }
  });
 }

 async function runCreateViewQuery() {
    let sql2 = `CREATE VIEW Division AS
    SELECT U.username, S.search, U.country
    FROM User U LEFT JOIN Searches S ON U.username = S.username;`;

    return await db.run(sql2, [], (err) => {
      if (err) { 
        throw err;
      }
    });
  }

async function runDivisionQuery() {
    let sql = `SELECT DISTINCT D.Search
    FROM Division D
    WHERE NOT EXISTS (SELECT U1.country
                        FROM User U1
                        EXCEPT
                        SELECT D1.country
                        FROM Division D1
                        WHERE D1.search = D.search);`;


    const result = await db.all
          (sql, [], (err, rows) => {
              if (err) {
                  throw err;
              }
              return rows;
          });
    return result;
  }
  
  


module.exports = { 
  displaySearchesRegular,
  displaySearchesWithAIScoreFilter, 
  hideColumnsLogic,
  displaySearchesWithAggregationOnSearch,
  displaySearchesThatHaveBeenMadeMultipleTimes,
  displaySearchesMadeInAllCountries
}
