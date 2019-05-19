const jwt = require('jsonwebtoken');
const config = require('../config');

const checkAuth = (req, res, next) => {
    var token = req.headers['token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.user = {
            login: decoded.login,
            id: decoded.id
        };

        next();
    });
}

const tokenAPI = (req, res, next) => {
    const payload = {
        login: 'Developer',
        id: 9999,
        time: new Date()
    };
    var token = jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.tokenExpireTime
    });

    return res.status(200).send({token: token});
}

module.exports = {
    checkAuth,
    tokenAPI
}