const express = require("express");
const appConfig = require('./configs/app.config');
const multer = require("multer");
require('./helpers/env.helper');

/*
const bodyParser = require("body-parser"); // Nodejs body parsing middleware
=> no need when use express.urlencoded
*/

const studentRouter = require('./routes/student.route');
const roomRouter = require('./routes/room.route');
const utilityRouter = require('./routes/utility.route');

const app = express();
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })) // for form data

// config view engine
appConfig(app);

const hostname = process.env.HOSTNAME
const port = process.env.PORT

app.listen(port, hostname, () => {
  console.log(`>>> url app: ${'http://' + hostname + ':' + port}`);
})

app.use('/student', studentRouter);
app.use('/room', roomRouter);
app.use('/utility', utilityRouter)

// UPLOAD FILE SIMPLE EXAMPLE
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, './uploads/utility-icons');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
}).array('uploaded_file', 3);

app.post('/profile', function (req, res) {

  upload(req, res, (err) => {

    // error handler
    if (err instanceof multer.MulterError) {
      throw new Error(`An eror has occurred: ` + err.message);
    }
    else if (err) {
      throw new Error(`Loi xong xac dinh: ${err}`);
    }
    else {
      // req.file is the name of your file in the form above, here 'uploaded_file'
      // req.body will hold the text fields, if there were any 

      req.files.forEach((file, index) => {
        console.log(`>>> file ${index}: ` + file.destination + '/' + file.originalname);
      })

      console.log('req body: ', req.body)
    }
  })

});
