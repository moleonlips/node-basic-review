const connection = require("../configs/database.config");

const getAllRooms = async () => {
  const [result] = await connection.query(`SELECT * FROM room`);
  return result && result.length > 0 ? result : [];
}


const getRoomByID = async (roomid) => {
  const [result] = await connection.query(`SELECT * FROM room WHERE room.id = ?`, [roomid]);
  return result ? result : {};
};

const addANewRoom = async (room, length, width, height, area, capacity) => {
  await connection.query(
    `INSERT INTO room (room_name, room_length, room_width, room_height, room_area, max_capacity) VALUES (?, ?, ?, ?, ?, ?)`,
    [room, length, width, height, area, capacity]
  );
};

/// update room's info function, list of params need to pass (room name, length, width, height, area, max_capacity and id of the room is updating.)
const updateRoom = async (room, length, width, height, area, capacity, roomID) => {
  await connection.query(
    `UPDATE room SET room_name = ?, room_length = ?, room_width = ?, room_height = ?, room_area = ?, max_capacity = ? WHERE room.id = ?`,
    [room, length, width, height, area, capacity, roomID]
  );
};

const deleteRoom = async (roomid) => {
  await connection.query(`DELETE FROM room WHERE room.id = ?`, [roomid]);
};

const searchRooms = async (keysearch) => {
  const [result] = connection.query(`SELECT * FROM room r WHERE r.room_name LIKE CONCAT ('%', ?, '%')`, [keysearch]);
  return result && result.length ? result : [];
};

module.exports = {
  getAllRooms,
  getRoomByID,
  addANewRoom,
  updateRoom,
  deleteRoom,
  searchRooms
}