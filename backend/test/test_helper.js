const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://admin:Secret123@ds151082.mlab.com:51082/game_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => done())
        .on('error', error => {
            console.warn('Warning', error);
        });
});

beforeEach(done => {
    const { games } = mongoose.connection.collections;
    games.drop(() => {
        done();
    });
});