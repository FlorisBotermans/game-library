const Game = require('../models/game');

module.exports = {
    createCharacter(req, res, next) {
        const character = req.body;

        Game.findById({ _id: req.params.gameid })
            .then(game => {
                game.characters.push(character);
                return game.save();
            })
            .then(() => res.send(character))
            .catch(next);
    }, 

    getCharacters(req, res, next) {
        Game.findOne({ _id: req.params.gameid })
            .then((game) => res.send(game.characters))
            .catch(next);
    },

    getCharacterById(req, res, next) {
        var character = null;
        Game.findOne({ _id: req.params.gameid })
            .then((game) => {
                game.characters.forEach(char => {
                    if(char._id == req.params.characterid) {
                        character = char;
                    }
                });       
                res.send(character);         
            })
            .catch(next);
    },

    editCharacter(req, res, next) {
        Game.updateOne(
            { _id: req.params.gameid, "characters._id": req.params.characterid },
            { $set: { "characters.$.name": req.body.name, "characters.$.title": req.body.title, "characters.$.role": req.body.role } }
        )
        .then(game => res.send(game))
        .catch(next);
    },

    deleteCharacter(req, res, next) {
        Game.findByIdAndUpdate(
            { _id: req.params.gameid },
            { $pull: { characters: { _id: req.params.characterid } } }
        )
        .then(game => res.status(204).send(game))
        .catch(next);
    }
};