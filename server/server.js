const express = require('express');
const app = express();
const connectDB = require('./db');
const path = require('path');

const apiRouter = require('./routes/api.js')

connectDB();

/**
 * handle parsing request body
 */
app.use(express.json());

/**
 * define route handlers
 */
app.use('/api', apiRouter);

/**
 * serve up index.html and static bundle file for production
 */
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  })
}

app.get('*', function (req, res, next) {
  res.sendStatus(404);
})

/**
 * global error handler
 */
app.use(function (err, req, res, next) {
  console.log('err is', err) // -> {}
  // logic
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  } 
  const errorObj = Object.assign(defaultErr, err);
  // console.log('errorObj: ', errorObj);
  console.log('Error Status: ', errorObj.status);
  // respond to the request with errorObj.status and errorObj.message as JSON

  res.status(errorObj.status).json(errorObj.message.err);
})


app.listen(3000);
