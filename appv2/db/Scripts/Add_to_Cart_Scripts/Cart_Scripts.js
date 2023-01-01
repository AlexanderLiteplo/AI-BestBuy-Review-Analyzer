const sqlite3 = require("sqlite3").verbose();

// open database ProjectScript.db

let db = new sqlite3.Database("../../ProjectScripts.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});


// Add product to cart
function addToCart(username, productID) {
  // check if the product is already in the cart
  let sql0 = `SELECT * FROM CartContainsProduct WHERE username = '${username}' AND productID = '${productID}'`;
  let isInCartAlready = false;
  db.all(sql0
    , [], (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length > 0) {
          // if the product is already in the cart do nothing
          isInCartAlready = true;
      }
    });

  let cartID;
  // if not, add it to the cart
  //get cartID from username
  if(!isInCartAlready) {
    let sql1 = `SELECT cartID FROM Cart WHERE username = '${username}'`;
    
    db.all
    (sql1, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        cartID = row['cartID'];
        console.log("==================================");
        console.log("cartID: " + cartID);
        console.log("==================================");
      });
    });
  
    // TODO: ARYAN MAKE THIS ASYNC CALL WAIT FOR THE CARTID TO BE SET
  
    // add cartID, product and username combo to cartContainsProduct table
    let sql2 = `INSERT INTO CartContainsProduct (cartID, username, productID) VALUES (${cartID}, '${username}', '${productID}')`;
    db.all
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
  }
}

//delete cart item
function deleteCartItem(productID, username) {
  let sql = `DELETE FROM CartContainsProduct WHERE productID = '${productID}' AND username = '${username}'`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ message: "success", data: rows });
  });
}


//display cart
function displayCart(username) {
  let cartID;
  let sql1 = `SELECT cartID FROM Cart WHERE username = '${username}'`;
    
    db.all
    (sql1, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        cartID = row['cartID'];
        console.log("==================================");
        console.log("cartID: " + cartID);
        console.log("==================================");
      });
  });
  //ARYAN TODO SAME THING MAKE SURE CARTID IS SET BEFORE THIS
  let sql = `SELECT * FROM CartContainsProduct WHERE cartID = '${cartID}'`;
  db.all(sql
    , [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row);
    });
    }
  );

}



//print the contents of cartcontainsproduct
function printToConsoleCartContainsProduct() {
  let sql = `SELECT * FROM CartContainsProduct`;
  db.all(sql
    , [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row);
    });
    }
  );
}

// call addToCart(sample input)
// call displayCartContainsProduct() to see the contents of the table
addToCart("sickduck", 10);
printToconsoleCartContainsProduct();


// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});