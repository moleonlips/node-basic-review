const express = require('express');
const roomRouter = express.Router();

roomRouter.get('/', (req, res) => {
  res.send(`get all room of the hotel!`)
})

roomRouter.get('/roomname/:roomname',
  (req, res, next) => {
    req.headers['x-bio-id'] = 'xin chao viet nam';
    console.log(`>>> step: `, 1);
    next();
    console.log(`>>> step: `, 2);
    res.send(`Are you searching room ${req.params.roomname}`);
  },
  (req, res) => {
    console.log(`>>> step: `, 3);
    console.log(`>>> x-bio-id: `, req.headers['x-bio-id'])
  }
)

roomRouter.get('/roomImages', (req, res) => {
  res.render('room.ejs')
})

module.exports = roomRouter;

