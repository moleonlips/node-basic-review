const connection = require("../configs/database.config");
const bodyParser = require("body-parser");

const getAllRooms = (req, res) => {
  // logic handlers
  let rooms = [];

  connection.query(
    'SELECT * FROM room',
    (err, result) => {
      rooms = result;
      return res.render('rooms/home.ejs', { list: rooms });
    }
  )
}

const saveRoom = (req, res) => {
  console.log('>>> room name: ', req.body.room);
  console.log('>>> room length: ', req.body.length);
  return res.render(
    'rooms/save-success.ejs',
    {
      roomName: req.body.room,
      roomLength: req.body.length
    }
  );
}

const createANewRoom = (req, res) => {
  return res.render('rooms/form.ejs');
}

module.exports = {
  getAllRooms,
  createANewRoom,
  saveRoom
};