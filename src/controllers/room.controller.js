const connection = require("../configs/database.config");
const path = require("path");
const roomServices = require("../services/room.service");

const getAllRooms = async (req, res) => {
  // connection.query(
  //   roomServices.getAllRooms,
  //   (err, result) => {
  //     if (err) throw new Error(`Something went wrong: ${err}`);

  //     console.log('>> result: ', result)
  //     return res.render('rooms/home.ejs', { list: result });
  //     res.send(200, result);
  //   }
  // )

  /// connect db using PROMISE WRAPPER
  const [result, fields] = await connection.query(`SELECT * FROM room`);
  console.log('>>> check result: ', result);
  return res.render('rooms/home.ejs', { data: result })
}

const getRoomByID = async (req, res) => {
  console.log('>>> req.params.id: ', req.params.id)
  const roomID = req.params.id;

  // connection.query(
  //   roomServices.getRoomByID, [roomID],
  //   (err, result) => {
  //     if (err) throw new Error(`Something went wrong: ${err}`);

  //     console.log('>> result: ', result)
  //     res.send(200, result);
  //     // return res.render('rooms/home.ejs', { list: result });
  //   }
  // )

  const [result, feilds] = await connection.query(roomServices.getRoomByID, [roomID]);
  res.send(200, result);
}

const saveRoom = async (req, res) => {

  const room = req.body.room;
  const length = Number(req.body.length);
  const width = Number(req.body.width);
  const height = Number(req.body.height);
  const capacity = Number(req.body.capacity);
  const area = length * width;

  // connection.query(
  //   roomServices.addANewRoom,
  //   [room, length, width, height, area, capacity],
  //   (err, result) => {
  //     if (err) throw new Error('some thing went wrong: ', err.message);
  //     // res.send(200, 'Insert successfully!')
  //     return res.render('rooms/save-success.ejs');
  //   }
  // )

  /// MYSQL2 PROMISS WRAPPER
  await connection.query(
    roomServices.addANewRoom,
    [room, length, width, height, area, capacity]
  )
  console.log('>>> A new room was inserted: ', req.body);
  await res.render('rooms/save-success.ejs', { newRoom: req.body });
}

const updateRoomInfo = async (req, res) => {
  const room = req.body.room;
  const length = Number(req.body.length);
  const width = Number(req.body.width);
  const height = Number(req.body.height);
  const capacity = Number(req.body.capacity);
  const area = length * width;

  const roomID = req.params.id;
  console.log(`>>> room id: `, roomID);

  // connection.query(
  //   roomServices.updateRoom,
  //   [room, length, width, height, area, capacity, roomID],
  //   (err, result) => {
  //     if (err) throw new Error('Something went wrong: ', err.message);
  //     req.body = { ...req.body, roomID: roomID }
  //     res.send(200, `Room has been updated successfully: ${req.body}`);
  //   }
  // )

  await connection.query(roomServices.updateRoom, [room, length, width, height, area, capacity, roomID]);
  res.send(200, `Room ${roomID} was updated: ${req.body}`);
}

const deleteRoom = async (req, res) => {
  const roomID = req.params.id;

  console.log('>> room id: ', req.params)

  // connection.query(
  //   roomServices.deleteRoom,
  //   [roomID],
  //   (err, result) => {
  //     if (err) throw new Error(`Something went wrong: ${err.message}`);
  //     res.send(200, `Room was deleted: ${result}`);
  //   }
  // )

  await connection.query(roomServices.deleteRoom, [roomID])
  console.log(`Rome ${roomID} was deleted!`);
  res.send(200, 'Delete successfully!');
}

const createANewRoom = (req, res) => {
  return res.render('rooms/form.ejs');
}

const searchRoom = async (req, res) => {
  console.log('>>> key search: ', req.params.keysearch)
  const [result, fields] = await connection.query(
    roomServices.searchRooms, [req.params.keysearch]
  )
  if (result.length) res.send(200, result);
  else res.send(400, `Have not any room with that name!`);
}

module.exports = {
  getAllRooms,
  getRoomByID,
  createANewRoom,
  saveRoom,
  updateRoomInfo,
  deleteRoom,
  searchRoom
};