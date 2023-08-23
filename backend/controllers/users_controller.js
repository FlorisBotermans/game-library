const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    if (user.isValid(req.body.password)) {
                        let token = jwt.sign({userName: user.userName}, 'secret', {expiresIn: '2d'});

                        return res.status(200).json(token);
                    } else {
                        res.status(401).send({ Error: 'Invalid password' });
                    }
                } else {
                    res.status(401).send({ Error: 'Email is not registered' })
                }
            })
            .catch(() => res.status(501).send('Internal error'));
    },

    register(req, res, next) {
        const user = new User({
            email: req.body.email,
            userName: req.body.userName,
            password: User.hashPassword(req.body.password)
        });

        user.save()
            .then((user) => res.status(201).send(user))
            .catch(next);
    }
}