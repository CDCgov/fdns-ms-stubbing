const express = require('express');
const app = express();

const routes = require('../lib/routes');
routes(app);

module.exports = app;
