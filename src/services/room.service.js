const getAllRooms = `SELECT * FROM room`;

const getRoomByID = `SELECT * FROM room WHERE room.id = ?`;

const addANewRoom = `INSERT INTO room (room_name, room_length, room_width, room_height, room_area, max_capacity) VALUES (?, ?, ?, ?, ?, ?)`;

/// update room's info function, list of params need to pass (room name, length, width, height, area, max_capacity and id of the room is updating.)
const updateRoom =
  `UPDATE room SET 
    room_name = ?,
    room_length = ?,
    room_width = ?,
    room_height = ?,
    room_area = ?,
    max_capacity = ?
  WHERE room.id = ?`;

const deleteRoom = `DELETE FROM room WHERE room.id = ?`;

const searchRooms = `SELECT * FROM room r WHERE r.room_name LIKE CONCAT ('%', ?, '%')`;

module.exports = {
  getAllRooms,
  getRoomByID,
  addANewRoom,
  updateRoom,
  deleteRoom,
  searchRooms
}