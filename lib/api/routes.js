'use strict';
const pinfo = require('../../package');
const { version } = pinfo;
const api = '/api/1.0';

const storage = require('./storage'),
    object = require('./object'),
    indexing = require('./indexing'),
    combiner = require('./combiner'),
    rules = require('./rules'),
    reporting = require('./reporting'),
    cdautils = require('./cdautils'),
    hl7utils = require('./hl7utils'),
    msftutils = require('./msftutils'),
    oauth2 = require('./oauth2');

const secureMode = process.env.SECURE_MODE || false;

module.exports = function(app) {

    app
    .route('/')
    .get((req, res) => {
        res.send({ version });
    });

    if (secureMode) {
        app.all('*', requireMockAuth)
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
    app.use(`/cdautils${api}`, cdautils);

    // fdns-ms-hl7-utils routes
    app.use(`/hl7utils${api}`, hl7utils);

    // fdns-ms-msft-utils routes
    app.use(`/msftutils${api}`, msftutils);

    // oauth2 routes
    app.use(`/oauth2`, oauth2);
};


function requireMockAuth(req, res, next) {
    try {
        if (req.headers && req.headers.authorization) {
            const bearerString = req.headers.authorization;
            const parts = bearerString.split(' ');

            // Checking if there is a Bearer authorization header - doesn't validate the jwt
            if (parts.length === 2) {
                const scheme = parts[0];
                if (/^Bearer$/i.test(scheme)) {
                    return next();
                }
                else {
                    res.status(400).send({"message": "Authorization Header Format Invalid"});
                }
            }
            else {
                res.status(400).send({"message": "Authorization Header Format Invalid"});
            }
        }
        else {
            res.status(400).send({"message": "Invalid or Missing Authorization Header"});
        }
    }
    catch(err) {
        res.status(401).send(err);
    }
}