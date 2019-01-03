const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('./app');

// CDA Utils Routes
describe('CDA Utils Routes', () => {
  const baseURL = '/cda/api/1.0';

  it(`GET ${baseURL}`, (done) => {
    request(app)
    .get(baseURL)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`GET ${baseURL}/generate`, (done) => {
    request(app)
    .get(`${baseURL}/generate`)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`POST ${baseURL}/json`, (done) => {
    request(app)
    .post(`${baseURL}/json`)
    .send('cda')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });
});
