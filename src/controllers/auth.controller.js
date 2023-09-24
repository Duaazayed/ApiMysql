const bcrypt = require('bcrypt');

const connection = require('../db-config');
const {
    GET_ME_BY_USERNAME,
    GET_ME_BY_USERNAME_WITH_PASSWORD,
    INSERT_NEW_USER,
} = require('../queries/user.queries');
const query = require('../utils/query');
const { refreshTokens, generateAccessToken, generateRefreshToken } = require('../utils/jwt-helpers');

const escape = require('../utils/escape');

exports.register = async (req, res) => {
    console.log(req.body.password);
    //const salt= bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, 10);
    const { username, email, password } = escape({
      ...req.body,
      password: hash,
    });
    const con = await connection().catch((err) => {
        console.log(err);
        throw err;
    });
    const user = await query(con, GET_ME_BY_USERNAME(username)).catch(
        (err) => {
            res.status(500);
            res.json({ msg: 'Could not retrieve user.' });
        }
    );
    if (user.length === 1) {
        res.json({ msg: 'User already exists' });
    } else {
        const result = await query(con, INSERT_NEW_USER(username, email, password)).catch((err) => {
            res
                .status(500)
                .json({ msg: 'Could not register user. please try again later' });
        });
        if (result.affect === 1) {
            res.json({ msg: "new user created" });
        }
    }
};
exports.login = async (req, res) => {
    const { username } = escape(req.body);
    const { password } = req.body;
    const con = await connection().catch((err) => {
        console.log(err);
        throw err;
    });
    const user = await query(con, GET_ME_BY_USERNAME_WITH_PASSWORD(username)).catch((err) => {
        res.status(500);
        res.send({ msg: 'could not retrieve user' });
        return;
    });

    if (user) {
        console.log(user[0].password, req.body.password);
        const validPass = await bcrypt
            .compare(password, user[0].password)
            .catch((err) => {
                console.log('failed to check password');
                res.json(500).json({ msg: 'Invalid password!' });
                //res.status(500).send({ msg: 'Invalid password' });
               // return;
            });
        if (!validPass) {
            res.status(400).send({ msg: 'Invalid password' });
            return;
        }
        const accessToken = generateAccessToken(user[0].user_id, { expiresIn: 86400 });
        const refreshToken = generateRefreshToken(user[0].user_id, { expiresIn: 86400 });
        refreshTokens.push(refreshToken);
        res
            .header('access_token', accessToken)
            .json({
                auth: true,
                msg: 'Logged in',
                token_type: 'bearer',
                access_token: accessToken,
                expires_in: 86400,
                refresh_token: refreshToken,
            });
    }
    else {
        res.status(401).json({ msg: 'Invalid login credentials.' });
      }
};

exports.token = (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) {
        res
            .status(401)
            .send({ auth: false, msg: "Access Denied.No token provided" });
    }
    if (!refreshTokens.includes(refreshToken)) {
        res, status(403).send({ msg: 'Invalid Refresh Token' });
    }
    const verified = verifyToken(refreshToken, jwtconfig.refresh, req, res);

    if (verified) {
        const accessToken = generateToken(user[0].user_id, { expiresIn: 86400 });
        res.header('access_token', accessToken)
            .send({
                auth: true,
                msg: 'Logged in',
                token_type: 'bearer',
                access_token: accessToken,
                expires_in: 20,
                refresh_token: refreshToken,
            });
    }
    res.status(403).send({ msg: 'Invalid Token' });
};

exports.logout = (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((t) => t !== refreshToken);

    res.send('Logout successful');
};