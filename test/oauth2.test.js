const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('./app');

// OAuth 2.0 Routes
describe('OAuth 2.0 Routes', () => {
  const baseURL = '/oauth2/';

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
