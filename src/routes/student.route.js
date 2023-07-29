const express = require('express');
const studentRouter = express.Router();

studentRouter.get('/', (req, res) => {
  res.render('home.ejs',)
})

studentRouter.get('/triangel', (req, res) => {
  res.send('hello from D!');
}
);

module.exports = studentRouter;
