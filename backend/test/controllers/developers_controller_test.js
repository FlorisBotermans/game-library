const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');

describe('Developer controller', () => {
    it('POST to api/games/gameid/developers creates a new developer of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform1', category: 'testCategory1' });

        game.save().then(() => {
            request(app)
                .post('/api/games/' + game._id + '/developers')
                .send({ name: 'testName2' })
                .end(() => {
                    Game.findOne({ name: 'testName1' })
                        .then((game) => {
                            assert(game.developers[0].name === 'testName2');
                            done();
                        });
                });
        });
    });

    it('GET to api/games/gameid/developers retrieves all developers of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform1', category: 'testCategory1', developers: [{ name: 'testName2' }, { name: 'testName3' }] });

        game.save().then(() => {
            request(app)
                .get('/api/games/' + game._id + '/developers')
                .end((err, response) => {
                    assert(response.body.length === 2);
                    done();
                });
        });
    });

    it('GET to api/games/gameid/developers/developerid retrieves a specific developer of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform1', category: 'testCategory1', developers: [{ name: 'testName2' }, { name: 'testName3' }] });

        game.save().then(() => {
            request(app)
                .get('/api/games/' + game._id + '/developers/' + game.developers[1]._id)
                .end((err, response) => {
                    assert(response.body.name === 'testName3');
                    done();
                });
        });
    });

    it('PUT to /api/games/gameid/developers/developerid edits a developer of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform', category: 'testCategory', developers: [{ name: 'testName2' }] });

        game.save().then(() => {
            request(app)
                .put('/api/games/' + game._id + '/developers/' + game.developers[0]._id)
                .send({ name: 'testName3' })
                .end(() => {
                    Game.findOne({ name: 'testName1' })
                        .then((game) => {
                            assert(game.developers[0].name === 'testName3');
                            done();
                        });
                });
        });
    });

    it('DELETE to /api/games/gameid/developers/developerid deletes the developer of a game', done => {
        const game = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform1', category: 'testCategory1', developers: [{ name: 'testName2' }, { name: 'testName3' }] });

        game.save().then(() => {
            request(app)
                .delete('/api/games/' + game._id + '/developers/' + game.developers[1]._id)
                .end((err, response) => {
                    Game.findOne({ name: 'testName1' })
                        .then((game) => {
                            assert(game.developers.length === 1);
                            done();
                        });
                });
        });
    });
});