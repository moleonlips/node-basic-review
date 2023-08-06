const express = require("express");
const appConfig = require('./configs/app.config');
require('./helpers/env.helper');
const connection = require("./configs/database.config");
const path = require("path");
const studentRouter = require('./routes/student.route');
const roomRouter = require('./routes/room.route');

const app = express();

// config view engine
appConfig(app);

const hostname = process.env.HOSTNAME
const port = process.env.PORT

app.listen(port, hostname, () => {
  console.log(`>>> url app: ${'http://' + hostname + ':' + port}`);
})

connection.query(
  'SELECT * FROM room',
  (err, result) => {
    if (err) {
      console.log('>>> err: ', err)
    }
    console.log(path.resolve(__dirname, __filename), '\n>>> result: ', result);
  }
)

app.use('/student', studentRouter);
app.use('/room', roomRouter);