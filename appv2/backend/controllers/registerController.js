const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd, address, zip, city, country  } = req.body;
    console.log(req.body);
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db

    try {
        // Use sqlite query to insert new user
        
        console.log( user + " : " +pwd);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });

    }

}

module.exports = { handleNewUser };