const Game = require('../models/game');

module.exports = {
    createGame(req, res, next) {
        Game.create(new Game(req.body))
            .then(game => res.send(game))
            .catch(next);
    }, 

    getGames(req, res, next) {
        Game.find()
            .then(games => res.send(games))
            .catch(next);
    },

    getGameById(req, res, next) {
        Game.findById({ _id: req.params.gameid })
            .then(game => res.send(game))
            .catch(next);
    },

    editGame(req, res, next) {
        Game.findByIdAndUpdate(
            { _id: req.params.gameid },
            { name: req.body.name, description: req.body.description, platform: req.body.platform, category: req.body.category }
        )
        .then(game => res.send(game))
        .catch(next);
    },

    deleteGame(req, res, next) {
        Game.findByIdAndDelete(
            { _id: req.params.gameid }
        )
        .then(game => res.status(204).send(game))
        .catch(next);
    }
};