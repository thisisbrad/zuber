const express = require('express');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
// connect to MongoDB with control statement
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/zuber');
}

app.use(json());
// attaching routes
routes(app);

app.use((err, req, res, next) => {
  // Error middleware
  res.status(422).send({ error: err._message });
});

module.exports = app;
