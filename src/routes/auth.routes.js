const express = require('express');
const {register,login,token,logout} = require('../controllers/auth.controller');

//const Router  = require('express');

const authRoutes = express.Router();

authRoutes.post('/register', register);

authRoutes.post('/login', login);

authRoutes.post('/token', token);

authRoutes.post('/logout', logout);

module.exports = authRoutes;