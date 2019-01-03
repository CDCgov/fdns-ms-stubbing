const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('./app');

// MSFT Utils Routes
describe('MSFT Utils Routes', () => {
  const baseURL = '/msft/api/1.0';

  it(`GET ${baseURL}`, (done) => {
    request(app)
    .get(baseURL)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });
});
