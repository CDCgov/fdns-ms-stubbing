const express = require('express');
const router = express.Router();

const sendError = require('./errors');
const pinfo = require('../../package');
const { version } = pinfo;

router.get('/', (req, res) => {
  res.send({ 'Reporting Version': version });
});

// Request jobs
router.post('/jobs', (req, res) => {
  const name = req.query.name;
  const reportRequest = req.body.reportRequest || {};
  const {
    query, type, format, database, collection, config, index,
  } = reportRequest;

  let message = '';
  const method = 'request';

  if (query && type && format && database && collection) {
    if (type !== 'object' && type !== 'indexing') {
      message = 'The following `type` is invalid: test. Valid `type` values are `object` and `indexing`.';
      sendError(res, method, message);
      return;
    }

    if (type === 'indexing' && !index) {
      message = 'The parameter `index` is required in the JSON body.';
      sendError(res, method, message);
      return;
    }

    if ((format === 'xlsx' || format === 'csv') && config) {
      res.status(200).send({
        database,
        query,
        format,
        progress: 0,
        collection,
        _id: 'ecbafb48-c25c-4df6-8e64-f1e4637fa341',
        type,
        config,
        events: [
          {
            event: 'JOB_CREATED',
            timestamp: Date.now(),
          },
        ],
        status: 'RUNNING',
      });
    } else if (format === 'xlsx' || format === 'csv') {
      message = 'The parameter `config` representing the Combiner config or `mapping` is required when you want to export CSV or XLSX.';
      sendError(res, method, message);
    } else if (format === 'json') {
      res.status(200).send({
        database,
        query,
        format,
        progress: 0,
        collection,
        _id: 'ecbafb48-c25c-4df6-8e64-f1e4637fa341',
        type,
        events: [
          {
            event: 'JOB_CREATED',
            timestamp: Date.now(),
          },
        ],
        status: 'RUNNING',
      });
    } else {
      message = `The following 'format' is not valid: ${format}.`;
      sendError(res, method, message);
    }
  } else {
    message = 'The parameters `query`, `type`, `format`, `database`, and `collection` are required in the JSON object body, reportRequest.';
    sendError(res, method, message);
  }
});

// Get job progress
router.get('/jobs/:id', (req, res) => {
  const id = req.params.id;
  if (id === 'valid') {
    res.status(200).send({
      database: 'testDatabase',
      query: 'testQuery',
      format: 'json',
      progress: 0,
      collection: 'testCollection',
      _id: id,
      type: 'object',
      events: [
        {
          event: 'JOB_CREATED',
          timestamp: Date.now(),
        },
      ],
      status: 'RUNNING',
    });
  } else {
    // Job ID doesn't exist
    const message = '400 null';
    sendError(res, 'request', message);
  }
});

// Restart job
router.put('/jobs/:id', (req, res) => {
  const id = req.params.id;
  if (id === 'valid') {
    res.status(200).send({
      database: 'testDatabase',
      query: 'testQuery',
      format: 'json',
      progress: 0,
      collection: 'testCollection',
      _id: id,
      type: 'object',
      events: [
        {
          event: 'JOB_CREATED',
          timestamp: Date.now(),
        },
        {
          event: 'RESTARTED',
          timestamp: Date.now(),
        },
      ],
      status: 'RUNNING',
    });
  } else {
    // Job ID doesn't exist
    const message = '400 null';
    sendError(res, 'request', message);
  }
});

module.exports = router;
