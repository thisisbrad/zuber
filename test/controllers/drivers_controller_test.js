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
    const email = 'test@driver.com';
    const driver = new Drivers({ email, driving: false });
    // edit driver
    driver.save().then(() => {
      // hit database for driver
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          //
          Drivers.findOne({ email }).then(driver => {
            //
            asssert(driver.driving === true);
            done();
          });
        });
    });
  });

  it.only('DELETE to /api/driver removes a driver', done => {
    const driver = new Drivers({ email: 'test@driver.com' });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Drivers.findOne({ email: 'test@driver.com' }).then(driver => {
            console.log('here?', driver);
            assert(driver === null);
            done();
          });
        });
    });
  });
});
