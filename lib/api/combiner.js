const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'temp/' });

router.get('/', (req, res) => {
  res.send({ version: '1.0.0' });
});

// Create or update rules for a configuration
router.post('/config/:config', (req, res) => {
  const config = req.params.config;
  const payload = req.body;

  if (payload && config) {
    res.status(200).send({
      success: true,
      config,
    });
  } else {
    res.status(400).send({
      success: false,
      config,
    });
  }
});

// Create or update rules for a configuration
router.put('/config/:config', (req, res) => {
  const config = req.params.config;
  const payload = req.body;

  if (payload && config) {
    res.status(200).send({
      success: true,
      config,
    });
  } else {
    res.status(400).send({
      success: false,
      config,
    });
  }
});

// Get configuration
router.get('/config/:config', (req, res) => {
  const config = req.params.config;

  if (config === 'myconfig') {
    res.status(200).send({
      _id: config,
      config: 'mockConfigData',
    });
  } else {
    res.status(400).send({
      method: 'getConfig',
      message: "This configuration doesn't exist.",
      config,
      success: false,
    });
  }
});

// Delete configuration
router.delete('/config/:config', (req, res) => {
  const config = req.params.config;

  if (config === 'myconfig') {
    res.status(200).send({
      success: true,
    });
  } else {
    res.status(400).send({
      method: 'deleteConfig',
      message: "This configuration doesn't exist.",
      config,
      success: false,
    });
  }
});

// Flatten JSON object to JSON, CSV, and XLSX
router.post('/:targetType/flatten', [
  upload.single('file'),
  (req, res) => {
    const targetType = req.params.targetType;

    if (req.file && targetType) {
      res.status(200).send({
        success: true,
      });
    } else {
      res.status(400).send({
        method: 'flatten',
        success: false,
        message: 'This requires a JSON file',
      });
    }
  },
]);

// Export dara to CSV or XLSX
router.post('/:targetType/:config', [
  upload.any(),
  (req, res) => {
    const config = req.params.config;
    const targetType = req.params.targetType;

    if (req.files && targetType && config) {
      // This returns a file in the live version, but we simply return a 200.
      res.status(200).send('This is a sample return that would be in your target data type.');
    } else {
      res.status(400).send({
        method: 'combine',
        success: false,
        message: 'This requires an array of files',
      });
    }
  },
]);

module.exports = router;
