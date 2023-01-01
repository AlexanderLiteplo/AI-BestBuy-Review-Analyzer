const sqlite3 = require("sqlite3").verbose();

// open database ProjectScript.db
let db = new sqlite3.Database("../../ProjectScripts.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

// =================================================================================================
// BEGIN User Scripts:

function updateUser(username, password, postalCode, address, city, country) {
  let sql = `UPDATE User 
        SET password = '${password}', 
        postalCode = '${postalCode}',
        address = '${address}',
        city = '${city}',
        country = '${country}'
    WHERE username = '${username}';`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
}

function deleteUser(username) {
  let sql = `DELETE FROM User WHERE username = '${username}' `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
}

function login(username, password){
  let sql = `SELECT * FROM User WHERE username = '${username}' AND password = '${password}'`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    if(rows.length == 0) {
      return true;
    }
    else {
      return false;
    }
  });
}

function getAllUserInfo(username) {
  let sql = `SELECT * FROM User WHERE username = '${username}' `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
}

function addUser(
  username,
  password,
  postalCode,
  address,
  city,
  country
) {
  // generate a login ID
  // get highest loginID fron User table
  let loginID = generateloginID(db);

  let sql = `INSERT INTO User(username,
        loginID,
        password,
        advertisementID,
        postalCode,
        address,
        city,
        country) 
    VALUES('${username}',
        '${loginID}',
        '${password}',
        '${1}',
        '${postalCode}',
        '${address}',
        '${city}',
        '${country}')`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });

  // add a cart for the user
  addCart(loginID, username);
}

async function generateloginID(db) {
  // Make query that finds highest searchID and then add 1 to that
  let sql = `SELECT MAX(loginID) FROM User;`;
  console.log("Generating login ID");
  let searchID = await db.all
  (sql, [], (err, rows) => {
      if (err) {
          throw err;
      }
      return rows;
  });
  return searchID[0]['MAX(loginID)'] + 1;
}


function addCart(cartID, username) {
  let sql = `INSERT INTO Cart(cartID, username)
        VALUES('${cartID}', '${username}')`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
}


// =================================================================================================
// END User Scripts
// =================================================================================================
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
