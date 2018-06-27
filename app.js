const express = require('express');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
// connect to MongoDB with control statement
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/zuber');
} else {
  mongoose.connect('mongodb://localhost/zuber_test');
}

app.use(json());
// attaching routes
routes(app);

module.exports = app;
