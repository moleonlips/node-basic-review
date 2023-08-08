const express = require('express');
const roomRouter = express.Router();
const roomControllers = require("../controllers/room.controller");

roomRouter.get('/home', roomControllers.getAllRooms);

roomRouter.get('/form', roomControllers.createANewRoom);

roomRouter.post('/save', roomControllers.saveRoom)

module.exports = roomRouter;

