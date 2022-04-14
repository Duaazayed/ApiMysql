const {jwtconfig, verifyToken} = require('../utils/jwt-helpers')
//const jwt= require('jsonwebtoken');
//const jwtconfig = require('../utils/jwt-helpers');
module.exports= (req, res, next)=>{
    const authHeader = req.headers['auth-token'] || req.headers['authorization'];
    const accessToken = authHeader.split(' ')[1];
    if(!accessToken){
     res
     .status(401)
     .send({ auth: false, msg: 'Access Denied, No token provided'});
     }

try{
    const user = verifyToken(accessToken, jwtconfig.access, req, res);
    req.user= user;
    next();
} catch (err){
    res.status(403).send({msg: 'Invalid Token'});
}
};