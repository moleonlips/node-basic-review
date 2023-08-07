const express = require('express');
const route = express.Router();

const homeController = require('../controllers/home.controller');

route.get('/', homeController.getHomePage);

module.exports = route;