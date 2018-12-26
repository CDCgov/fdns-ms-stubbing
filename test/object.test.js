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

  it(`DELETE ${baseURL}/:db/:collection`, (done) => {
    request(app)
    .delete(`${baseURL}/mydb/mycollection`)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.success).to.eq(true);
      done();
    });
  });

  it(`GET ${baseURL}/:db/:collection`, (done) => {
    request(app)
    .get(`${baseURL}/mydb/mycollection`)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.total).to.exist;
      expect(res.body.items).to.exist;
      done();
    });
  });

  it(`POST ${baseURL}/:db/:collection/:id`, (done) => {
    request(app)
    .post(`${baseURL}/mydb/mycollection/test`)
    .send({ name: 'foobar' })
    .set('Accept', 'application/json')
    .expect(201)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.name).to.eq('foobar');
      done();
    });
  });

  it(`GET ${baseURL}/:db/:collection/:id`, (done) => {
    request(app)
    .post(`${baseURL}/mydb/mycollection/test`)
    .send({ name: 'foobar' })
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.name).to.eq('foobar');

      request(app)
      .get(`${baseURL}/mydb/mycollection/test`)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body.name).to.eq('foobar');
        done();
      });
    });
  });

  it(`PUT ${baseURL}/:db/:collection/:id`, (done) => {
    request(app)
    .post(`${baseURL}/mydb/mycollection/test`)
    .send({ name: 'foobar' })
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.name).to.eq('foobar');

      request(app)
      .put(`${baseURL}/mydb/mycollection/test`)
      .send({ name: 'foobaz' })
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body.name).to.eq('foobaz');
        done();
      });
    });
  });

  it(`DELETE ${baseURL}/:db/:collection/:id`, (done) => {
    request(app)
    .post(`${baseURL}/mydb/mycollection/test`)
    .send({ name: 'foobar' })
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.name).to.eq('foobar');

      request(app)
      .delete(`${baseURL}/mydb/mycollection/test`)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body.success).to.be.true;
        done();
      });
    });
  });

  it(`POST ${baseURL}/:db/:collection/aggregate`, (done) => {
    request(app)
    .post(`${baseURL}/mydb/mycollection/aggregate`)
    .send([])
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.items).to.exist;
      done();
    });
  });

  it(`POST ${baseURL}/:db/:collection/count`, (done) => {
    request(app)
    .post(`${baseURL}/mydb/mycollection/count`)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.count).to.be.a('number');
      done();
    });
  });

  it(`POST ${baseURL}/:db/:collection/distinct/:field`, (done) => {
    request(app)
    .post(`${baseURL}/mydb/mycollection/distinct/test`)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body).to.be.an('array');
      done();
    });
  });

  it(`POST ${baseURL}/:db/:collection/find`, (done) => {
    request(app)
    .post(`${baseURL}/mydb/mycollection/find`)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.total).to.be.a('number');
      expect(res.body.items).to.be.an('array');
      done();
    });
  });

  it(`GET ${baseURL}/:db/:collection/search`, (done) => {
    request(app)
    .get(`${baseURL}/mydb/mycollection/search`)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.total).to.be.a('number');
      expect(res.body.items).to.be.an('array');
      done();
    });
  });

  it(`POST ${baseURL}/bulk/:db/:collection`, (done) => {
    request(app)
    .post(`${baseURL}/bulk/mydb/mycollection`)
    .attach('file', 'test/fixtures/test.csv')
    .expect(201)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.inserted).to.be.a('number');
      expect(res.body.ids).to.be.an('array');
      done();
    });
  });

  it(`POST ${baseURL}/multi/:db/:collection`, (done) => {
    request(app)
    .post(`${baseURL}/multi/mydb/mycollection`)
    .send([{ name: 'foobar' }, { name: 'foobaz' }])
    .set('Accept', 'application/json')
    .expect(201)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.body.inserted).to.eq(2);
      expect(res.body.items).to.be.an('array');
      done();
    });
  });
});
