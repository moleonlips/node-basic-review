const express = require('express');
const route = express.Router();

const utilityController = require('../controllers/utility.controller');

route.get('/', utilityController.getAllUtilities);
route.post('/add', utilityController.addNewUtility);
route.get('/form', utilityController.getForm);
route.get('/del-confirm/:id', utilityController.getDelConfirmView);
route.get('/del/:id', utilityController.delAnUtility);
route.post('/stats', utilityController.uploadFile);
route.post('/update/:id', utilityController.updateUtility);
route.get('/update-form/:id', utilityController.getFormUpdate);

module.exports = route