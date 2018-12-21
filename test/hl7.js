const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('./app');

// HL7 Utils Routes
describe('HL7 Utils Routes', () => {
  const baseURL = '/hl7/api/1.0';

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
