const roomServices = require("../services/room.service");

const getAllRooms = async (req, res) => {

  /// connect db using PROMISE WRAPPER
  const result = await roomServices.getAllRooms();
  return res.render('rooms/home.ejs', { data: result })
}

const getRoomByID = async (req, res) => {
  console.log('>>> req.params.id: ', req.params.id)
  const roomID = req.params.id;
  const result = await roomServices.getRoomByID(roomID);
  res.send(200, result);
}

const saveRoom = async (req, res) => {

  const room = req.body.room;
  const length = Number(req.body.length);
  const width = Number(req.body.width);
  const height = Number(req.body.height);
  const capacity = Number(req.body.capacity);
  const area = length * width;


  /// MYSQL2 PROMISS WRAPPER
  roomServices.addANewRoom(room, length, width, height, capacity, area);
  console.log('>>> A new room was inserted: ', req.body);
  res.redirect('/room');
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

  await roomServices.updateRoom(room, length, width, height, area, capacity, roomID);
  // res.send(200, `Room ${roomID} was updated: ${req.body}`);

  await res.render('rooms/save-success.ejs', { newRoom: req.body, message: 'Update successfully!' });
}

const deleteRoom = async (req, res) => {
  const roomID = req.params.id;

  console.log('>> room id: ', req.params)

  await roomServices.deleteRoom(roomID);
  console.log(`Rome ${roomID} was deleted!`);
  await res.render('rooms/save-success.ejs', { message: 'That room was deleted successfully!', newRoom: [] });
}

const createANewRoom = (req, res) => {
  return res.render('rooms/form.ejs');
}

const searchRoom = async (req, res) => {
  const keysearch = req.params.keysearch;
  const result = await roomServices.searchRooms(keysearch);
  if (result.length) res.send(200, result);
  else res.send(400, `Have not any room with that name!`);
}

const getUpdateForm = async (req, res) => {
  const roomID = req.params.id;
  const result = await roomServices.getRoomByID(roomID);

  console.log('>>> check room: ', result);
  await res.render('rooms/update-form.ejs', { roomUpdate: result[0] });
}

const getDeleteConfirm = async (req, res) => {
  const roomID = req.params.id;
  const result = await roomServices.getRoomByID(roomID);
  await res.render('rooms/delete-confirm.ejs', { myRoom: result[0], message: 'Do you want to DELETE this room?' });
}

module.exports = {
  getAllRooms,
  getRoomByID,
  createANewRoom,
  saveRoom,
  updateRoomInfo,
  deleteRoom,
  searchRoom,
  getUpdateForm,
  getDeleteConfirm
};