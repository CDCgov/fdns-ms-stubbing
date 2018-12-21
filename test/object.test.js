const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('./app');

// Object Routes
describe('Object Routes', () => {
  const baseURL = '/object/api/1.0';

  it(`GET ${baseURL}`, (done) => {
    request(app)
    .get(baseURL)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`POST ${baseURL}/:db/:collection`, (done) => {
    request(app)
    .post(`${baseURL}/mydb/mycollection`)
    .send({ name: 'foobar' })
    .set('Accept', 'application/json')
    .expect(201)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.name).to.eq('foobar');
      done();
    });
  });
});
