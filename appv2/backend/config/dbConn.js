// open database in memory
const sqlite3 = require('sqlite3').verbose();
const util = require('util');

//print present working directory

let db = new sqlite3.Database(process.cwd()+'/db/ProjectScripts.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the ProjectScripts.db SQlite database.');
});


db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);

  
module.exports = db



// module.exports = connectDB