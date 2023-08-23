const UsersController = require('../controllers/users_controller');
const GamesController = require('../controllers/games_controller');
const DevelopersController = require('../controllers/developers_controller');
const CharactersController = require('../controllers/characters_controller');
const verifyToken = require('../middleware/verify_token');

module.exports = (app) => {
    // USER CRUD
    app.post('/api/login', UsersController.login);
    app.post('/api/register', UsersController.register);

    if (process.env.NODE_ENV !== 'test') {
        // GAME CRUD
        app.post('/api/games', verifyToken, GamesController.createGame);
        app.get('/api/games', verifyToken, GamesController.getGames);
        app.get('/api/games/:gameid', verifyToken, GamesController.getGameById);
        app.put('/api/games/:gameid', verifyToken, GamesController.editGame);
        app.delete('/api/games/:gameid', verifyToken, GamesController.deleteGame);
    
        // DEVELOPER CRUD
        app.post('/api/games/:gameid/developers', verifyToken, DevelopersController.createDeveloper);
        app.get('/api/games/:gameid/developers', verifyToken, DevelopersController.getDevelopers);
        app.get('/api/games/:gameid/developers/:developerid', verifyToken, DevelopersController.getDeveloperById);
        app.put('/api/games/:gameid/developers/:developerid', verifyToken, DevelopersController.editDeveloper);
        app.delete('/api/games/:gameid/developers/:developerid', verifyToken, DevelopersController.deleteDeveloper);
    
        // CHARACTER CRUD
        app.post('/api/games/:gameid/characters', verifyToken, CharactersController.createCharacter);
        app.get('/api/games/:gameid/characters', verifyToken, CharactersController.getCharacters);
        app.get('/api/games/:gameid/characters/:characterid', verifyToken, CharactersController.getCharacterById);
        app.put('/api/games/:gameid/characters/:characterid', verifyToken, CharactersController.editCharacter);
        app.delete('/api/games/:gameid/characters/:characterid', verifyToken, CharactersController.deleteCharacter);
    } else {
        // GAME CRUD
        app.post('/api/games', GamesController.createGame);
        app.get('/api/games', GamesController.getGames);
        app.get('/api/games/:gameid', GamesController.getGameById);
        app.put('/api/games/:gameid', GamesController.editGame);
        app.delete('/api/games/:gameid', GamesController.deleteGame);
    
        // DEVELOPER CRUD
        app.post('/api/games/:gameid/developers', DevelopersController.createDeveloper);
        app.get('/api/games/:gameid/developers', DevelopersController.getDevelopers);
        app.get('/api/games/:gameid/developers/:developerid', DevelopersController.getDeveloperById);
        app.put('/api/games/:gameid/developers/:developerid', DevelopersController.editDeveloper);
        app.delete('/api/games/:gameid/developers/:developerid', DevelopersController.deleteDeveloper);
    
        // CHARACTER CRUD
        app.post('/api/games/:gameid/characters', CharactersController.createCharacter);
        app.get('/api/games/:gameid/characters', CharactersController.getCharacters);
        app.get('/api/games/:gameid/characters/:characterid', CharactersController.getCharacterById);
        app.put('/api/games/:gameid/characters/:characterid', CharactersController.editCharacter);
        app.delete('/api/games/:gameid/characters/:characterid', CharactersController.deleteCharacter);
    }
};