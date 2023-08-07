const connection = require("../configs/database.config");

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

module.exports = {
  getAllRooms
};