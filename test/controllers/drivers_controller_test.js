const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Driver controller', () => {
  // method > route > result
  it('POST to /api/drivers creates a new driver', done => {
    // get count of driverd
    Driver.count().then(count => {
      //
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@driver.com' })
        .end(res => {
          Driver.count().then(newCount => {
            //
            assert((count = 1 === newCount));
            done();
          });
        });
    });
  });

  it('PUT to /api/drivers edits an existing driver', done => {
    // create driver for test
    const email = 'test@driver.com';
    const driver = new Driver({ email, driving: false });
    // edit driver
    driver.save().then(() => {
      // hit database for driver
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          //
          Driver.findOne({ email }).then(driver => {
            //
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it('DELETE to /api/driver removes a driver', done => {
    const driver = new Driver({ email: 'test@driver.com' });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: 'test@driver.com' }).then(driver => {
            assert(driver === null);
            done();
          });
        });
    });
  });

  it('GET to /api/drivers?lng=555&lat=555 finds drivers close to location', done => {
    //
    const seattleDriver = new Driver({
      email: 'seattle@driver.com',
      geometry: {
        type: 'Point',
        coordinates: [-122.4759902, 47.6147628]
      }
    });
    const miamiDriver = new Driver({
      email: 'miami@driver.com',
      geometry: {
        type: 'Point',
        coordinates: [-80.253, 25.791]
      }
    });
    const newDrivers = [seattleDriver.save(), miamiDriver.save()];

    Promise.all(newDrivers).then(() => {
      request(app)
        .get('/api/drivers?lng=-80&lat=25')
        .end((err, response) => {
          //
          console.log(response);
          done();
        });
    });
  });
});
