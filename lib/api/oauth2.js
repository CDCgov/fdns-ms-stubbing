const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

let scope = 'fdns';

router.get('/', (req, res) => {
  res.send({ OAuth: '2.0' });
});

router.post('/mock', bodyParser.urlencoded({ extended: false }), (req, res) => {
  scope = req.body.scope;
  console.log(`Setting scope to: ${scope}`);
  res.send({ scope });
});

router.post('/token/introspect', (req, res) => {
  const data = {
    active: true,
    scope,
    exp: Math.ceil(new Date().getTime() / 1000) + (60 * 60 * 24),
  };
  console.log('Introspect called: ');
  console.log(data);
  res.send(data);
});

module.exports = router;
