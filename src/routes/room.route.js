const express = require('express');
const roomRouter = express.Router();
const roomControllers = require("../controllers/room.controller");

roomRouter.get('/', roomControllers.getAllRooms);

roomRouter.get('/:id', roomControllers.getRoomByID);

/// call form input
roomRouter.get('/form', roomControllers.createANewRoom);

roomRouter.post('/create', roomControllers.saveRoom);

roomRouter.post('/update/:id', roomControllers.updateRoomInfo);

roomRouter.delete('/delete/:id', roomControllers.deleteRoom)

module.exports = roomRouter;

