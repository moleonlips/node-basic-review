const express = require("express");
const appConfig = require('./configs/app.config');
require('./helpers/env.helper');
const connection = require("./configs/database.config");
const path = require("path");
const studentRouter = require('./routes/student.route');
const roomRouter = require('./routes/room.route');
const homeRouter = require('./routes/home.route');

const app = express();

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