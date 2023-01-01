const sqlite3 = require('sqlite3').verbose();

// open database ProjectScript.db
let db = new sqlite3.Database('../../ProjectScripts.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});
/// =================================================================================================
// BEGIN Advertisement Scripts:
// =================================================================================================


function getAdvertisementForUser(username) {
    let sql = `SELECT brand FROM Advertisement NATURAL JOIN User WHERE username = '${username}' `;
    db.all
    (sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row['brand']);
            return row['brand'];
        });
    });
}

getAdvertisementForUser('xanderminer');

// =================================================================================================
// END Advertisement Scripts
// =================================================================================================
// close the database connection
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });