const assert = require('assert');
const request = require('supertest');
const app = require('../app');
describe('The Express main app', () => {
  it('connects and boots server', done => {
    //
    request(app)
      .get('/api')
      .end((err, response) => {
        //
        console.log(response);
      });
    done();
  });
});
