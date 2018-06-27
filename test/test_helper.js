const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/zuber_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.error('Error', err));
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => done())
    .catch(() => done());
});
