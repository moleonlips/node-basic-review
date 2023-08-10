const express = require('express');
const roomRouter = express.Router();
const roomControllers = require("../controllers/room.controller");

roomRouter.get('/', roomControllers.getAllRooms);

roomRouter.get('/get-by-id/:id', roomControllers.getRoomByID);

/// call form input
roomRouter.get('/form', roomControllers.createANewRoom);

roomRouter.post('/create', roomControllers.saveRoom);

roomRouter.post('/update/:id', roomControllers.updateRoomInfo);

roomRouter.get('/delete/:id', roomControllers.deleteRoom)

roomRouter.get('/search/room-name/:keysearch', roomControllers.searchRoom);

roomRouter.get('/updateForm/:id', roomControllers.getUpdateForm)

roomRouter.get('/delete-confirm/:id', roomControllers.getDeleteConfirm)

module.exports = roomRouter;

