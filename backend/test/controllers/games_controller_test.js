const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');

describe('Game controller', () => {
    it('POST to api/games creates a new game', done => {
        request(app)
            .post('/api/games')
            .send({ name: 'testName', description: 'testDescription', platform: 'testPlatform', category: 'testCategory' })
            .end(() => {
                Game.findOne({ name: 'testName' })
                    .then(user => {
                        assert(user.description === 'testDescription');
                        done();
                    });
            });
    });

    it('GET to api/games retrieves all games', done => {
        const game1 = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform1', category: 'testCategory1' });
        const game2 = new Game({ name: 'testName2', description: 'testDescription2', platform: 'testPlatform2', category: 'testCategory2' });

        Promise.all([game1.save(), game2.save()])
            .then(() => {
                request(app)
                    .get('/api/games')
                    .end((err, response) => {
                        assert(response.body.length === 2);
                        assert(response.body[0].platform === 'testPlatform1');
                        assert(response.body[1].platform === 'testPlatform2');
                        done();
                    });
            });
    });

    it('GET to api/games/gameid retrieves a specific game', done => {
        const game = new Game({ name: 'testName', description: 'testDescription', platform: 'testPlatform', category: 'testCategory' });

        game.save().then(() => {
            request(app)
                .get('/api/games/' + game._id)
                .end((err, response) => {
                    assert(response.body.name === 'testName');
                    done();
                });
        });
    });

    it('PUT to api/games/gameid edits a game', done => {
        const game1 = new Game({ name: 'testName1', description: 'testDescription1', platform: 'testPlatform1', category: 'testCategory1' });
        const game2 = new Game({ name: 'testName2', description: 'testDescription2', platform: 'testPlatform2', category: 'testCategory2' });

        game1.save().then(() => {
            request(app)
                .put('/api/games/' + game1._id)
                .send(game2)
                .end(() => {
                    Game.findOne({ name: 'testName2' })
                        .then(game => {
                            assert(game.description === 'testDescription2');
                            done();
                        });
                });
        });
    });

    it('DELETE to api/games/gameid deletes a game', done => {
        const game = new Game({ name: 'testName', description: 'testDescription', platform: 'testPlatform', category: 'testCategory' });

        game.save().then(() => {
            request(app)
                .delete('/api/games/' + game._id)
                .end(() => {
                    Game.findOne({ name: 'testName' })
                        .then(game => {
                            assert(game === null);
                            done();
                        });
                });
        });
    });
});