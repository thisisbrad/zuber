const express = require('express');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
// connect to MongoDB
mongoose.connect('mongodb://localhost/zuber');

app.use(json());
// attaching routes
routes(app);

module.exports = app;
