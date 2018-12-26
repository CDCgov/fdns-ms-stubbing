const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('./app');

// Indexing Routes
describe('Indexing Routes', () => {
  const baseURL = '/indexing/api/1.0';

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
