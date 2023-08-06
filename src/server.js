const express = require("express");
const appConfig = require('./configs/app.config');
require('./helpers/env.helper');
const connection = require("./configs/database.config");

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
  (err, result, fields) => {
    if (err) {
      console.log('>>> err: ', err)
    }
    console.log('>>> result: ', result);
    console.log('>>> fields: ', fields);

  }
)

app.use('/student', studentRouter);
app.use('/room', roomRouter);