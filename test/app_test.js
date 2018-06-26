const assert = require('assert');
const request = require('supertest');
const app = require('../app');
describe('The Express main app', () => {
  it('connects and boots server', done => {
    //
    request(app)
      .get('/api')
      .end((err, response) => {
        // Assert that that GET route returns data
        assert(typeof response.body === 'object');
        assert(response.body.howdy === 'partner');
        assert(response.status === 200);
        done();
      });
  });
});
