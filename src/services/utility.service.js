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

module.exports = {
  getAllUtilities,
  addNewUtility
}