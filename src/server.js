const express = require("express");
const appConfig = require('./configs/app.config');

// database connection
const connection = require('./configs/database.config');

// require('./helpers/env.helper');

const studentRouter = require('./routes/student.route');
const roomRouter = require('./routes/room.route');

const app = express();

// config view engine
appConfig(app);

const hostname = process.env.HOSTNAME
const port = process.env.PORT

app.listen(port, hostname, () => {
  console.log(`app listening on port ${port}`);
})

app.use('/student', studentRouter);
app.use('/room', roomRouter);