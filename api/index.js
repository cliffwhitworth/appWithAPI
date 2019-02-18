require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const routes = require('./routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// if (process.env.Environment !== 'production') {
//   app.use(logger('dev'));
// }

app.use('', routes(router));

// const httpPort = process.env.PORT || 5000;
app.listen(5000, err => {
  console.log('Listening');
});

module.exports = app;
