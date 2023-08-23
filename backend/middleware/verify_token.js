const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization.split(' ')[1];
        jwt.verify(bearerToken, 'secret');
        next();
    } catch (error) {
        res.sendStatus(401);
    }
};