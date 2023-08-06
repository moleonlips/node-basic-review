const express = require("express");
const appConfig = require('./configs/app.config');
require('./helpers/env.helper');

const studentRouter = require('./routes/student.route');
const roomRouter = require('./routes/room.route');

const app = express();
const path = require('path');

// config view engine
appConfig(app);

const hostname = process.env.HOSTNAME || `localhost`
const port = process.env.PORT || 8080

console.log(process.env)

app.listen(port, hostname, () => {
  console.log(`app listening on port ${'http://' + hostname + ':' + port}`);
})

app.use('/student', studentRouter);
app.use('/room', roomRouter);