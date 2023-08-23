const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    role: { type: String, required: true }
});

module.exports = CharacterSchema;