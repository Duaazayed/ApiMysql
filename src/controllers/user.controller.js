const bcrypt= require('bcryptjs');
const connection= require('../db-config');
const query = require('../utils/query');
const {GET_ME_BY_USER_ID, 
    GET_ME_BY_USER_ID_WITH_PASSWORD, 
    UPDATE_USER } = require('../queries/user.queries');
const escape = require('../utils/escape');


exports.getMe= async(req, res) =>{
    const user = req.user;
    if( user.id){
        const con = await connection().catch((err)=>{
            throw err;
        });
        const existingUser = await query(con, GET_ME_BY_USER_ID(user.id)).catch((err)=>{
            res.status(500).json({msg: 'Could not find the user'});

        }
        );
        if(existingUser.length){
            res.status(200).send(existingUser);
        }else {
            res.status(400).json({ msg: 'No user found.' });
          }
    }
};

exports.updateMe = async function(req, res){
    const con = await connection().catch((err)=>{
        throw err;
});
const [existingUser] = await query(
    con,
    GET_ME_BY_USER_ID_WITH_PASSWORD(req.user.id)
  ).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'Could not retrieve user.' });
  });

  const {
    username: existingUsername,
    email: existingEmail,
    password: existingPassword,
  } = existingUser;

  const { username, email, password } = req.body;

  // checked for password changed
  // SAME LOGIC AS CHECKING FOR A VALID PASSWORD
  const isPasswordSame = await bcrypt
    .compare(password, existingPassword)
    .catch((err) => {
      console.log(err);
      res.json(500).json({ msg: 'Invalid password!' });
    });

  const newUser = username || existingUsername; // use same username if unchanged
  const newEmail = email || existingEmail; // use same email is unchaged
  const newPassword = !isPasswordSame // use same password if unchanged
    ? bcrypt.hashSync(password)
    : existingPassword;

  const {
    newUser: escapedUsername,
    newEmail: escapedEmail,
    newPassword: escapedPassword,
  } = escape({
    newUser,
    newEmail,
    newPassword,
  });

  // perform update
  const result = await query(
    con,
    UPDATE_USER(escapedUsername, escapedEmail, escapedPassword, req.user.id)
  ).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'Could not update user settings.' });
  });

  if (result.affectedRows === 1) {
    res.json({ msg: 'Updated succesfully!' });
  } else {
    res.json({ msg: 'Nothing to update...' });
  }
};