const utilityServices = require('../services/utility.service');

const getAllUtilities = async (req, res) => {
  const result = await utilityServices.getAllUtilities();
  console.log('>>> getAllUtilities ctrller: ', result);
  await res.render('utilities/main.ejs', { utilities: result ? result : [] });
  // res.send(utilities);
}

const addNewUtility = async (req, res) => {
  const u_name = req.body.u_name;
  const u_fee = req.body.u_fee;
  const u_description = req.body.u_description;
  const u_icon = req.body.u_icon;
  const u_unit = req.body.u_unit;

  await utilityServices.addNewUtility(u_name, u_fee, u_description, u_icon, u_unit);
  res.send(200, `A neu utility was added!\n ${JSON.stringify(req.body)}`);
}

const getForm = async (req, res) => {
  res.render('utilities/form.ejs');
}

module.exports = {
  getAllUtilities,
  addNewUtility,
  getForm
}