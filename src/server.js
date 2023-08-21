const express = require("express");
const appConfig = require('./configs/app.config');
const multer = require("multer");

const path = require('path');

require('./helpers/env.helper');

/*
const bodyParser = require("body-parser"); // Nodejs body parsing middleware
=> no need when use express.urlencoded
*/

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

app.use('/room', roomRouter);
app.use('/utility', utilityRouter)


