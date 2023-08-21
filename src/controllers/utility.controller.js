const connection = require('../configs/database.config');
const utilityServices = require('../services/utility.service');
const multer = require('multer');

const storageEngine = require('../middlewares/storage.engine');

const getAllUtilities = async (req, res) => {
  const result = await utilityServices.getAllUtilities();
  // console.log('>>> getAllUtilities ctrller: ', result);
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

const getDelConfirmView = async (req, res) => {
  const u_id = req.params.id;
  const [one] = await connection.query('SELECT * FROM utility u WHERE u.id = ?', [u_id]);
  console.log(one)
  await res.render('utilities/del-confirm.ejs', { data: one[0] });
}

const delAnUtility = async (req, res) => {
  const u_id = req.params.id;
  await connection.query(`DELETE FROM utility where id = ?`, [u_id]);

  const result = await utilityServices.getAllUtilities();
  // console.log('>>> getAllUtilities ctrller: ', result);
  await res.render('utilities/main.ejs', { utilities: result ? result : [] });
}

const upload = multer({ storage: storageEngine })

const uploadFile = async (req, res, next) => {
  return upload.single('uploaded_file'),
    () => {
      // req.file is the name of your file in the form above, here 'uploaded_file'
      // req.body will hold the text fields, if there were any 
      console.log(`req.body : `, req.body);
      console.log(`file uploaded : `, req.file);
    }
}

const getFormUpdate = async (req, res) => {
  const u_id = req.params.id
  const utility = await utilityServices.getUtilityByID(u_id);
  await res.render('utilities/update-form.ejs', { utilityUpdate: utility });
  console.log(utility)
}

const updateUtility = async (req, res) => {
  console.log(`>>> check req.body: `, req.body)

  const _id = req.params.id

  const _utility_name = req.body.u_name
  const _fee = req.body.fee
  const _description = req.body.description
  const _icon = req.body.icon
  const _unit = req.body.unit

  await utilityServices.updateUtility(_utility_name, _fee, _description, _icon, _unit, _id)
  res.redirect('/utility')
}

module.exports = {
  getAllUtilities,
  addNewUtility,
  getForm,
  getDelConfirmView,
  delAnUtility,
  uploadFile,
  getFormUpdate,
  updateUtility
}