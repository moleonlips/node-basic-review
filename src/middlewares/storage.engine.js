const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const myPath = `src/public/uploads`;
    fs.mkdirSync(myPath, { recursive: true }); // create new a folder following the path if it doesn't exist.
    return cb(null, myPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

module.exports = storage;