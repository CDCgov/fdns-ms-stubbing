const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('./app');

const hl7 = 'MSH|^~&|XXXX|C|RECEIVINGAPPLICATION|RECEIVINGFACILITY|20080511103530||ORU^R01|Q335939501T337311002|P|2.3|||';

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

  it(`GET ${baseURL}/generate`, (done) => {
    request(app)
    .get(`${baseURL}/generate`)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`POST ${baseURL}/caseId/:spec`, (done) => {
    request(app)
    .post(`${baseURL}/caseId/hl7`)
    .send(hl7)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`POST ${baseURL}/hash`, (done) => {
    request(app)
    .post(`${baseURL}/hash`)
    .send(hl7)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`POST ${baseURL}/json`, (done) => {
    request(app)
    .post(`${baseURL}/json`)
    .send(hl7)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`POST ${baseURL}/json/:profile`, (done) => {
    request(app)
    .post(`${baseURL}/json/myprofile`)
    .send(hl7)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`POST ${baseURL}/xml`, (done) => {
    request(app)
    .post(`${baseURL}/xml`)
    .send(hl7)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`GET ${baseURL}/rules/schema`, (done) => {
    request(app)
    .get(`${baseURL}/rules/schema`)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`POST ${baseURL}/rules/validate/:profile`, (done) => {
    request(app)
    .post(`${baseURL}/rules/validate/myprofile`)
    .send(hl7)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`POST ${baseURL}/rules/check`, (done) => {
    request(app)
    .post(`${baseURL}/rules/check`)
    .send({
      foo: 'bar',
    })
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`POST ${baseURL}/rules/:profile`, (done) => {
    request(app)
    .post(`${baseURL}/rules/myprofile`)
    .send({
      foo: 'bar',
    })
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`PUT ${baseURL}/rules/:profile`, (done) => {
    request(app)
    .put(`${baseURL}/rules/myprofile`)
    .send({
      foo: 'bar',
    })
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it(`GET ${baseURL}/rules/:profile/:ruleset`, (done) => {
    request(app)
    .get(`${baseURL}/rules/myprofile/warning`)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });
});
