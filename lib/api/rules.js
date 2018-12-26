const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'temp/' });

// Make this flexible based on Object?
const pinfo = require('../../package');
const { version } = pinfo;

router.get('/', (req, res) => {
  res.send({ 'Rules Version': version });
});

// Get saved rules for specified profile
router.get('/:profile', (req, res) => {
  const profile = req.params.profile;

  if (profile === 'valid') {
    res.status(200).send({
      _id: profile,
      profileProps: 'mockProfileData',
    });
  } else {
    res.status(400).send({
      method: 'getRules',
      message: "This profile doesn't exist.",
      success: false,
    });
  }
});

// Create or update rules for a profile
router.post('/:profile', (req, res) => {
  const profile = req.params.profile;

  res.status(200).send({
    success: true,
    profile,
  });
});

// Validate JSON message
router.post('/validate', [
  upload.fields([
    { name: 'json', maxCount: 1 },
    { name: 'rules', maxCount: 1 },
  ]),
  (req, res) => {
    const profile = req.params.profile;
    const json = req.files.json;
    const rules = req.files.rules;

    if (json && rules) {
      res.status(200).send({
        valid: true,
        errors: 0,
      });
    } else {
      res.status(400).send({
        timestamp: Date.now(),
        status: 400,
        error: 'Bad Request',
        message: "Required request part 'rules' or 'json' is not present",
        path: '/api/1.0/validate',
      });
    }
  },
]);

// Validate JSON object with profile - THIS CURRENTLY DOESN'T WORK IN THE MS
router.post('/validate/:profile', (req, res) => {
  const profile = req.params.profile;
  const payload = req.body;

  if (profile === 'valid') {
    res.status(200).send({
      valid: true,
      errors: 0,
    });
  }
});

module.exports = router;
