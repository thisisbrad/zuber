const express = require('express');
const { json } = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(json());
// attaching routes
routes(app);

module.exports = app;
