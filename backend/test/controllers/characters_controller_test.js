const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');

describe('Character controller', () => {
    it('POST to api/games/gameid/characters creates a new character of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform1', category: 'testCategory1' });

        game.save().then(() => {
            request(app)
                .post('/api/games/' + game._id + '/characters')
                .send({ name: 'testName2', title: 'testTitle2', role: 'testRole2' })
                .end(() => {
                    Game.findOne({ name: 'testName1' })
                        .then((game) => {
                            assert(game.characters[0].title === 'testTitle2');
                            done();
                        });
                });
        });
    });

    it('GET to api/games/gameid/characters retrieves all characters of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform1', category: 'testCategory1', characters: [{ name: 'testName2', title: 'testTitle2', role: 'testRole2' }, { name: 'testName3', title: 'testTitle3', role: 'testRole3' }] });

        game.save().then(() => {
            request(app)
                .get('/api/games/' + game._id + '/characters')
                .end((err, response) => {
                    assert(response.body.length === 2);
                    assert(response.body[0].role === 'testRole2');
                    assert(response.body[1].role === 'testRole3');
                    done();
                });
        });
    });

    it('GET to api/games/gameid/characters/characterid retrieves a specific character of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform1', category: 'testCategory1', characters: [{ name: 'testName2', title: 'testTitle2', role: 'testRole2' }, { name: 'testName3', title: 'testTitle3', role: 'testRole3' }] });

        game.save().then(() => {
            request(app)
                .get('/api/games/' + game._id + '/characters/' + game.characters[1]._id)
                .end((err, response) => {
                    assert(response.body.name === 'testName3');
                    done();
                });
        });
    });

    it('PUT to /api/games/gameid/characters/characterid edits a character of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform', category: 'testCategory', characters: [{ name: 'testName2', title: 'testTitle2', role: 'testRole2' }] });

        game.save().then(() => {
            request(app)
                .put('/api/games/' + game._id + '/characters/' + game.characters[0]._id)
                .send({ name: 'testName3', title: 'testTitle3', role: 'testRole3' })
                .end(() => {
                    Game.findOne({ name: 'testName1' })
                        .then((game) => {
                            assert(game.characters[0].name === 'testName3');
                            done();
                        });
                });
        });
    });

    it('DELETE to /api/games/gameid/characters/characterid deletes a character of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform', category: 'testCategory', characters: [{ name: 'testName2', title: 'testTitle2', role: 'testRole2' }, { name: 'testName3', title: 'testTitle3', role: 'testRole3' }] });

        game.save().then(() => {
            request(app)
                .delete('/api/games/' + game._id + '/characters/' + game.characters[0]._id)
                .end((err, response) => {
                    Game.findOne({ name: 'testName1' })
                        .then((game) => {
                            assert(game.characters.length === 1);
                            done();
                        });
                });
        });
    });
});