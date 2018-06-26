const express = require('express');

const app = express();

app.get('/api', (req, res) => {
  res.send({ howdy: 'partner' });
});

module.exports = app;
