// const User = require('../model/User');
const db =  require('../config/dbConn');
// const getAllUsers = async (req, res) => {
//     const users = await User.find();
//     if (!users) return res.status(204).json({ 'message': 'No users found' });
//     res.json(users);
// }

// const deleteUser = async (req, res) => {
//     if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
//     const user = await User.findOne({ _id: req.body.id }).exec();
//     if (!user) {
//         return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
//     }
//     const result = await user.deleteOne({ _id: req.body.id });
//     res.json(result);
// }

// const getUser = async (req, res) => {
//     if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
//     const user = await User.findOne({ _id: req.params.id }).exec();
//     if (!user) {
//         return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
//     }
//     res.json(user);
// }


const updateUser = async (req, res) => {
    const {username, password, postalCode, address, city, country}  = req.body;
    console.log(req.body);
    let sql = `UPDATE User 
          SET password = '${password}', 
          postalCode = '${postalCode}',
          address = '${address}',
          city = '${city}',
          country = '${country}'
      WHERE username = '${username}';`;
    await db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row);
      });
    });
    return res.status(200).send('User updated');
}

  
async function deleteUser(req, res) {
    const username = req?.query?.username;
    let sql = `DELETE FROM User WHERE username = '${username}' `;
    await db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
        return rows;
    });
    return res.status(200).send('User deleted');
}

const getAllUserInfo = async(req, res) => {
    const username = req?.query?.username;
    console.log(req?.query);
    let sql = `SELECT * FROM User WHERE username = '${username}' `;
    var result = await db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      return rows;
    });
    return res.send(result[0]);
}
  


module.exports = {
    getAllUserInfo,
    deleteUser,
    updateUser
}