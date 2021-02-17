const express = require('express');
const routes = express.Router();

const LyricController = require('./controllers/LyricController');

routes.post('/lyrics', LyricController.show);

module.exports = routes