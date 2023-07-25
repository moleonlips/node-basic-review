const express = require("express");
const path = require('path');

require('./helpers/env.helper');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

const hostname = process.env.HOSTNAME
const port = process.env.PORT

app.listen(port, hostname, () => {
  console.log(`app listening on port ${port}`);
})

app.get('/', (req, res) => {
  res.render('home.ejs',)
})