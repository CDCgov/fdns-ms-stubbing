const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('./app');

// Combiner Routes
describe('Combiner Routes', () => {
  const baseURL = '/combiner/api/1.0';

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
