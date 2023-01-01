const jwt = require('jsonwebtoken');
const db =  require('../config/dbConn');

async function login(username, password){
    let sql = `SELECT * FROM User WHERE username = '${username}' AND password = '${password}'`;
    return await db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      return rows;
    });
}
  

async function addUser(username, password, postalCode, address, city, country, loginID) {
    let sql = `INSERT INTO User(username, loginID, password, advertisementID, postalCode, address, city, country) 
                VALUES('${username}', '${loginID}', '${password}', '${1}', '${postalCode}', '${address}', '${city}', '${country}')`;
    return await db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      return rows;
    }); 
}
  
async function generateloginID() {
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
  
  
async function addCart(cartID, username) {
    console.log("Adding cart");
    let sql = `INSERT INTO Cart(cartID, username)
          VALUES('${cartID}', '${username}')`;
    return await db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      return rows;
    });
}


const handleLogin = async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    const match = await login(username, password);
    console.log(match);
    if (match.length>0) {
        const roles = ['admin'];
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
        const refreshToken = jwt.sign(
            { "username": username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.json({ roles, accessToken });
    } else {
        res.sendStatus(401);
    }
}

const handleRegister = async (req, res) => {
    const { user, pwd, address, zip, city, country  } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    try{
        let loginID = await generateloginID();
        await addUser(user, pwd, address, zip, city, country, loginID);
        await addCart(loginID, user);
        return res.status(201).json({ 'success': `New user ${user} created!` });
    }
    catch(err){
        console.log(err);
        return res.status(400).json({ 'error': err });
    }
}


module.exports = { handleLogin, handleRegister };