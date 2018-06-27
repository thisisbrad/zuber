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

  it('PUT to /api/drivers edits an existing driver', done => {
    // create driver for test
    const driver = new Drivers({ email: 'test@driver.com', driving: false });
    // edit driver
    driver.save().then(() => {
      //
    });
    // check for edit
    done();
  });
});
