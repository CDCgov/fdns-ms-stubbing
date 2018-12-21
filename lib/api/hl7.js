const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const sendError = require('./errors');
const pinfo = require('../../package');
const { version } = pinfo;

router.get('/', (req, res) => {
  res.send({ 'HL7 Utils Version': version });
});

// Generate random HL7 message
router.get('/generate', (req, res) => {
  res.type('application/xml');
  // Send generic test HL7
  res.status(200).send('MSH|^~&|XXXX|C|RECEIVINGAPPLICATION|RECEIVINGFACILITY|20080511103530||ORU^R01|Q335939501T337311002|P|2.3|||');
});

// Post - Get case identifier
router.post('/caseId/:spec', bodyParser.text({ type: '*/*' }), (req, res) => {
  const method = 'getCaseIdentifier';

  const spec = req.params.spec;
  const message = req.body;

  if (spec !== 'hl7' || spec !== 'phinms') {
    sendError(res, method, 'Spec must be `hl7` or `phinms`');
    return;
  }

  if (typeof message !== 'string') {
    sendError(res, method, 'Impossible to extract observation identifiers.');
    return;
  }

  if (message) {
    // Assumes you are passing correctly formatted HL7 data if it is a string
    res.status(200).send({
      id: '',
      hash: '',
      segments: {
        '77993-4': '',
        '77968-6': '',
        '77969-4': '',
        '77979-3': '',
      },
    });
  }
});

// Get message hash
router.post('/hash', bodyParser.text({ type: '*/*' }), (req, res) => {
  if (req.body) {
    res.status(200).send({
      hash: 'testHash',
    });
  } else {
    const message = 'Must contain a body that is plain text.';
    sendError(res, 'hash', message);
  }
});

// Transform HL7 to JSON
router.post('/json', bodyParser.text({ type: '*/*' }), (req, res) => {
  const hl7 = req.body;
  if (hl7) {
    // Assumes you are passing valid HL7
    res.status(200).send({
      extractor: {
        version: '1.0.0',
        hash: 'testHash',
        UCID: {
          id: 'EMPTY',
          hash: 'testHash',
        },
        timestamp: 1234567890,
      },
      message: {
        HL7: 'testData',
      },
    });
  } else {
    const message = 'Must contain a body that is valid HL7.';
    sendError(res, 'transformHL7toJSON', message);
  }
});

// Transform HL7 to JSON profile
router.post('/json/:profile', bodyParser.text({ type: '*/*' }), (req, res) => {
  const hl7 = req.body;
  if (hl7) {
    // Assumes you are passing valid HL7
    res.status(200).send({
      PII: {
        foundProfile: false,
        checked: true,
      },
      extractor: {
        version: '1.0.0',
        hash: 'testHash',
        UCID: {
          id: '',
          hash: '',
          segments: {
            '77993-4': '',
            '77968-6': '',
            '77969-4': '',
            '77979-3': '',
          },
        },
        timestamp: 1234567890,
      },
      message: {
        HL7: {
          version: '2.3',
        },
        type: 'HL7',
      },
    });
  } else {
    const message = 'Must contain a body that is valid HL7.';
    sendError(res, 'transformHL7toJSON', message);
  }
});

// Transform HL7 to XML
router.post('/xml', bodyParser.text({ type: '*/*' }), (req, res) => {
  const hl7 = req.body;
  if (hl7) {
    // Assumes you are passing valid HL7
    res.type('application/xml');
    // Send generic test XML
    res.status(200).send('<?xml version="1.0" encoding="UTF-8"?><PROCESSOR><MESSAGE><HL7><SOURCE></SOURCE></HL7></MESSAGE><EXTRACTOR><VERSION>1.0.0</VERSION><HASH>26798636121c9771ff526ec14d8f767c</HASH><UCID>EMPTY</UCID><timestamp>1544137363785</timestamp></EXTRACTOR></PROCESSOR>');
  } else {
    res.type('application/xml');
    res.status(400).send('<map><entry><string>method</string><string>transformHL7toXML</string></entry><entry><string>success</string><boolean>false</boolean></entry><entry><string>error</string><string>Empty message</string></entry></map>');
  }
});

module.exports = router;
