const connection = require("../configs/database.config");
const path = require("path");
const roomServices = require("../services/room.service");

const getAllRooms = (req, res) => {
  connection.query(
    roomServices.getAllRooms,
    (err, result) => {
      if (err) throw new Error(`Something went wrong: ${err}`);

      console.log('>> result: ', result)
      // return res.render('rooms/home.ejs', { list: result });
      res.send(200, result);
    }
  )
}

const getRoomByID = (req, res) => {
  console.log('>>> req.params.id: ', req.params.id)
  const roomID = req.params.id;

  connection.query(
    roomServices.getRoomByID, [roomID],
    (err, result) => {
      if (err) throw new Error(`Something went wrong: ${err}`);

      console.log('>> result: ', result)
      // return res.render('rooms/home.ejs', { list: result });
      res.send(200, result);
    }
  )
}

const saveRoom = (req, res) => {

  const room = req.body.room;
  const length = Number(req.body.length);
  const width = Number(req.body.width);
  const height = Number(req.body.height);
  const capacity = Number(req.body.capacity);
  const area = length * width;

  connection.query(
    roomServices.addANewRoom,
    [room, length, width, height, area, capacity],
    (err, result) => {
      if (err) throw new Error('some thing went wrong: ', err.message);
      res.send(200, 'Insert successfully!')
      return res.render('rooms/save-success.ejs');
    }
  )
}

const updateRoomInfo = (req, res) => {
  const room = req.body.room;
  const length = Number(req.body.length);
  const width = Number(req.body.width);
  const height = Number(req.body.height);
  const capacity = Number(req.body.capacity);
  const area = length * width;

  const roomID = req.params.id;
  console.log(`>>> room id: `, roomID);

  connection.query(
    roomServices.updateRoom,
    [room, length, width, height, area, capacity, roomID],
    (err, result) => {
      if (err) throw new Error('Something went wrong: ', err.message);
      req.body = { ...req.body, roomID: roomID }
      res.send(200, `Room has been updated successfully: ${req.body}`);
    }
  )
}

const deleteRoom = (req, res) => {
  const roomID = req.params.id;

  console.log('>> room id: ', req.params)

  connection.query(
    roomServices.deleteRoom,
    [roomID],
    (err, result) => {
      if (err) throw new Error(`Something went wrong: ${err.message}`);
      res.send(200, `Room was deleted: ${result}`);
    }
  )
}

const createANewRoom = (req, res) => {
  return res.render('rooms/form.ejs');
}

module.exports = {
  getAllRooms,
  getRoomByID,
  createANewRoom,
  saveRoom,
  updateRoomInfo,
  deleteRoom
};