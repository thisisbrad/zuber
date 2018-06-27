const asssert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const Drivers = mongoose.model('driver');

describe('Drivers controller', () => {
  // method > route > result
  it('POST to /api/drivers creates a new driver', done => {
    // get count of drivers
    Drivers.count().then(count => {
      //
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(res => {
          Drivers.count().then(newCount => {
            //
            asssert((count = 1 === newCount));
            done();
          });
        });
    });
  });
});
