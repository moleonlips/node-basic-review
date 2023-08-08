const express = require("express");
const appConfig = require('./configs/app.config');
require('./helpers/env.helper');

const bodyParser = require("body-parser"); // Nodejs body parsing middleware

const studentRouter = require('./routes/student.route');
const roomRouter = require('./routes/room.route');
const homeRouter = require('./routes/home.route');

const app = express();
app.use(bodyParser.urlencoded({ extended: false })) // 

// config view engine
appConfig(app);

const hostname = process.env.HOSTNAME
const port = process.env.PORT

app.listen(port, hostname, () => {
  console.log(`>>> url app: ${'http://' + hostname + ':' + port}`);
})

app.use('/student', studentRouter);
app.use('/room', roomRouter);
app.use('/home', homeRouter);