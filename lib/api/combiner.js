const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'temp/' });

// Make this flexible based on Object?
const pinfo = require('../../package');
const { version } = pinfo;

router.get('/', (req, res) => {
	res.send({ 'Combiner Version': version });
});

// Export dara to CSV or XLSX
router.post('/:targetType/:config', [
	upload.any(),
	(req, res) => {
		const config = req.params.config;
		const targetType = req.params.targetType;

		if (req.files) {
			// This returns a file in the live version, but we simply return a 200.
			res.status(200).send("This is a sample return that would be in your target data type.");
		}
		else {
			res.status(400).send({
				"method": "export",
				"success": false,
				"message": "This requires an array of files"
			});
		}
	}
]);

// Flatten JSON object to JSON, CSV, and XLSX
router.post('/:targetType/flatten', [
	upload.single('file'),
	(req, res) => {
		const targetType = req.params.targetType;

		if (req.file) {
			res.status(200).send({
				"success": true
			});
		}
		else {
			res.status(400).send({
				"method": "export",
				"success": false,
				"message": "This requires a JSON file"
			});
		}
	}
]);

// Create or update rules for a configuration
router.post('/config/:config', (req, res) => {
	const config = req.params.config;

	res.status(200).send({
		"success": true,
		"config": config
	});
});

// Get configuration
router.get('/config/:config', (req, res) => {
	const config = req.params.config;

	if (config === "valid") {
		res.status(200).send({
			"_id": config,
			"config": "mockConfigData"
		});
	}
	else {
		res.status(400).send({
			"method": "getConfig",
			"message": "This configuration doesn't exist.",
			"config": config,
			"success": false
		});
	}
});

// Delete configuration
router.delete('/config/:config', (req, res) => {
	const config = req.params.config;

	if (config === "valid") {
		res.status(200).send({
			"_id": config,
			"config": "mockConfigData"
		});
	}
	else {
		res.status(400).send({
			"method": "getConfig",
			"message": "This configuration doesn't exist.",
			"config": config,
			"success": false
		});
	}
});

module.exports = router;