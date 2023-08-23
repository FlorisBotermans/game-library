const Game = require('../models/game');

module.exports = {
    createDeveloper(req, res, next) {
        const developer = req.body;

        Game.findById({ _id: req.params.gameid })
            .then(game => {
                game.developers.push(developer);
                return game.save();
            })
            .then(() => res.send(developer))
            .catch(next);
    }, 

    getDevelopers(req, res, next) {
        Game.findOne({ _id: req.params.gameid })
            .then((game) => res.send(game.developers))
            .catch(next);
    },

    getDeveloperById(req, res, next) {
        var developer = null;
        Game.findOne({ _id: req.params.gameid })
            .then((game) => {
                game.developers.forEach(dev => {
                    if(dev._id == req.params.developerid) {
                        developer = dev;
                    }
                });       
                res.send(developer);     
            })
            .catch(next);
    },

    editDeveloper(req, res, next) {
        Game.updateOne(
            { _id: req.params.gameid, "developers._id": req.params.developerid },
            { $set: { "developers.$.name": req.body.name } }
        )
        .then(game => res.send(game))
        .catch(next);
    },

    deleteDeveloper(req, res, next) {
        Game.findByIdAndUpdate(
            { _id: req.params.gameid },
            { $pull: { developers: { _id: req.params.developerid } } }
        )
        .then(game => res.status(204).send(game))
        .catch(next);
    }
};