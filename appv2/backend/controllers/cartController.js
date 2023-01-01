const db =  require('../config/dbConn');
  
  //delete cart item
async function deleteCartItem(req,res) {
    const {productID, username} = req.query;
    console.log(productID);
    let sql = `DELETE FROM CartContainsProduct WHERE productID = '${productID}' AND username = '${username}'`;
    try{
      var result = await db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        return rows;
      });
      console.log(result);
      res.status(200).send(result);
    }
    catch(err){
      console.log(err);
      res.status(500).json({'message': err.message});
    }
  }
  
  //display cart
async function displayCart(req, res) {
    console.log(req.query.username);
    const {username} = req.query;
    let sql = `SELECT P.productID, P.name, P.price, P.company, B.score as bestBuyReviewScore, AI.score as aiReviewScore
    FROM CartContainsProduct CCP
    LEFT JOIN Product P ON CCP.productID = P.productID
    LEFT JOIN BestBuyReview B ON B.productID = P.productID
    LEFT JOIN AIReview AI ON AI.productID = P.productID
    WHERE CCP.username  = '${username}';`;
    try{
      var result = await db.all(sql
        , [], (err, rows) => {
          if (err) {
            throw err;
          }
          return rows;
        }
      );
      console.log(result);
    return res.status(200).send(result);
    }
    catch(err){
      console.log(err);
      return res.status(500).json({'message': err.message});
    }
  
  }
  
  module.exports = { deleteCartItem, displayCart };