const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home.ejs')
})

router.get('/getname/:fullname/:born/:age',
  (req, res, next) => {
    console.log(req.params)
    res.render('student/hello.student.ejs');
    next();
  },
  (req, res) => {
    console.log(`this is next function!`)
  }
)

router.get('/amount/:a', (req, res) => {
  const myObj = {
    amount: req.params.a
  }
  res.render('student/amount.ejs', myObj)
})

module.exports = router;