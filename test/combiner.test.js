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

  it(`GET ${baseURL}/config/:config`, (done) => {
    request(app)
    .get(`${baseURL}/config/myconfig`)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.config).to.exist;
      done();
    });
  });

  it(`POST ${baseURL}/config/:config`, (done) => {
    request(app)
    .post(`${baseURL}/config/myconfig`)
    .send('{}')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.success).to.eq(true);
      done();
    });
  });

  it(`PUT ${baseURL}/config/:config`, (done) => {
    request(app)
    .post(`${baseURL}/config/myconfig`)
    .send('{}')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.success).to.eq(true);
      done();
    });
  });

  it(`DELETE ${baseURL}/config/:config`, (done) => {
    request(app)
    .delete(`${baseURL}/config/myconfig`)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.success).to.eq(true);
      done();
    });
  });

  it(`POST ${baseURL}/:targetType/:config`, (done) => {
    request(app)
    .post(`${baseURL}/csv/myconfig`)
    .attach('file', 'test/fixtures/test.csv')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`POST ${baseURL}/:targetType/flatten`, (done) => {
    request(app)
    .post(`${baseURL}/csv/flatten`)
    .attach('file', 'test/fixtures/test.csv')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });
});
