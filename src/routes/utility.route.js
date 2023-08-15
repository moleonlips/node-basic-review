const express = require('express');
const route = express.Router();

const utilityController = require('../controllers/utility.controller');

route.get('/', utilityController.getAllUtilities);
route.post('/add', utilityController.addNewUtility);
route.get('/form', utilityController.getForm)

module.exports = route