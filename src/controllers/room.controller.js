const connection = require("../configs/database.config");
const path = require("path");
const getAllRooms = (req, res) => {
  // logic handlers
  let rooms = [];

  connection.query(
    'SELECT * FROM room WHERE room.id = ?',
    [1],
    (err, result) => {
      rooms = result;
      return res.render('rooms/home.ejs', { list: rooms });
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
    'INSERT INTO room (`room_name`, `room_length`, `room_width`, `room_height`, `room_area`, `max_capacity`) VALUES (?, ?, ?, ?, ?, ?);',
    [room, length, width, height, area, capacity],
    (err, result) => {
      if (err) throw new Error('some thing went wrong: ', err);
      console.log(`>>> result: `, result);
      return res.render('room/save-success.ejs');
    }
  )
}

const createANewRoom = (req, res) => {
  return res.render('rooms/form.ejs');
}

module.exports = {
  getAllRooms,
  createANewRoom,
  saveRoom
};