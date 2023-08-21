const connection = require('../configs/database.config');

const getAllUtilities = async () => {
  const [result] = await connection.query(`SELECT * FROM utility`);
  return result;
  // return result && result.length ? result : [];
}

const addNewUtility = async (u_name, u_fee, u_description, u_icon, u_unit) => {
  await connection.query(
    `INSERT INTO utility (utility_name, fee, description, icon, unit) VALUES (?, ?, ?, ?, ?);`,
    [u_name, u_fee, u_description, u_icon, u_unit]
  )
}

const getUtilityByID = async (u_id) => {
  const [result] = await connection.query(
    `SELECT * FROM utility where id = ?`,
    [u_id]
  )
  return result && result.length > 0 ? result[0] : {}
}

const updateUtility = async (utility_name, fee, description, icon, unit, id) => {
  await connection.query(
    `UPDATE utility SET utility_name=?, fee=?, description=?, icon=?, unit=? WHERE id=?`,
    [utility_name, fee, description, icon, unit, id]
  )
}

module.exports = {
  getAllUtilities,
  addNewUtility,
  getUtilityByID,
  updateUtility
}