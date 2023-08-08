const connection = require("../configs/database.config");
const bodyParser = require("body-parser");

const getAllRooms = (req, res) => {
  // logic handlers
  let rooms = [];

  connection.query(
    'SELECT * FROM room',
    (err, result) => {
      rooms = result;
      res.send(JSON.stringify(rooms));
    }
  )
}

const postRoom = (req, res) => {
  console.log(`>>> the body was sent: `, req.body);
  return res.render('rooms/list.ejs')
}

const createANewRoom = (req, res) => {
  console.log(bodyParser.urlencoded(req.body));
  return res.render('rooms/room.ejs');
}

module.exports = {
  getAllRooms,
  createANewRoom,
  postRoom
};