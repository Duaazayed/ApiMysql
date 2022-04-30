const jwt= require('jsonwebtoken');
//const { token } = require('morgan');
//const { secret } = require('../jwt-config');
const jwtconfig={
    access:'reallysecretaccesssecret',
    refresh:'reallysecretrefreshsecret',
};
const refreshTokens=[];
const generateAccessToken = (id, expiresIn) =>
  jwt.sign({ id }, jwtconfig.access, expiresIn);

// create a new re-auth token
const generateRefreshToken = (id, expiresIn) =>
  jwt.sign({ id }, jwtconfig.refresh, expiresIn);

// check token validity
const verifyToken = (token, secret, req, res) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    res.status(500).json({ auth: false, msg: 'Invalid token.' });
  }
};

module.exports = {
  jwtconfig,
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
