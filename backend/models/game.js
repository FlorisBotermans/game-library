const mongoose = require('mongoose');
const DeveloperSchema = require('./developer');
const CharacterSchema = require('./character');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    platform: { type: String, required: true },
    category: { type: String, required: true },
    developers: [DeveloperSchema],
    characters: [CharacterSchema]
});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;