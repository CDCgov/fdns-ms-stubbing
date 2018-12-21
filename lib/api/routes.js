const pinfo = require('../../package');
const { version } = pinfo;
const api = '/api/1.0';
const storage = require('./storage');
const object = require('./object');
const indexing = require('./indexing');
const combiner = require('./combiner');
const rules = require('./rules');
const reporting = require('./reporting');
const cdautils = require('./cda');
const hl7utils = require('./hl7');
const msftutils = require('./msft');
const oauth2 = require('./oauth2');
const secureMode = process.env.SECURE_MODE || false;

function requireMockAuth(req, res, next) {
  try {
    if (req.headers && req.headers.authorization) {
      const bearerString = req.headers.authorization;
      const parts = bearerString.split(' ');

      // Checking if there is a Bearer authorization header - doesn't validate the jwt
      if (parts.length === 2) {
        const scheme = parts[0];
        if (/^Bearer$/i.test(scheme)) {
          next();
        }

        res.status(400).send({ message: 'Authorization Header Format Invalid' });
      } else {
        res.status(400).send({ message: 'Authorization Header Format Invalid' });
      }
    } else {
      res.status(400).send({ message: 'Invalid or Missing Authorization Header' });
    }
  } catch (err) {
    res.status(401).send(err);
  }
}

module.exports = function (app) {
  app
    .route('/')
    .get((req, res) => {
      res.send({ version });
    });

  if (secureMode) {
    app.all('*', requireMockAuth);
  }

  // fdns-ms-storage routes
  app.use(`/storage${api}`, storage);

  // fdns-ms-object routes
  app.use(`/object${api}`, object);

  // fdns-ms-indexing routes
  app.use(`/indexing${api}`, indexing);

  // fdns-ms-combiner routes
  app.use(`/combiner${api}`, combiner);

  // fdns-ms-rules routes
  app.use(`/rules${api}`, rules);

  // fnds-ms-reporting routes
  app.use(`/reporting${api}`, reporting);

  // fdns-ms-cda-utils routes
  app.use(`/cda${api}`, cdautils);

  // fdns-ms-hl7-utils routes
  app.use(`/hl7${api}`, hl7utils);

  // fdns-ms-msft-utils routes
  app.use(`/msft${api}`, msftutils);

  // oauth2 routes
  app.use('/oauth2', oauth2);
};
