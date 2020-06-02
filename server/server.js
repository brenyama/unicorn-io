const express = require('express');
const app = express();
const connectDB = require('./db');
const path = require('path');

connectDB();

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  })
}

app.listen(3000);
