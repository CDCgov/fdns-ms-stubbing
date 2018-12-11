const express = require('express');
const router = express.Router();

// Make this flexible based on Object?
const pinfo = require('../../package');
const { version } = pinfo;

router.get('/', (req, res) => {
	res.send({ 'Indexing Version': version });
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

// Create or update configuration
router.post('/config/:config', (req, res) => {
	const config = req.params.config;
	// This config should have a .elastic.index
	if (checkNested(config, "elastic", "index")) {
		res.status(200).send({
			"success": true
		});
	}
	else {
		// This validation doesn't currently exist in indexing but the other calls will not work if this is incorrect.
		res.status(400).send({
			"method": "createConfig",
			"success": false,
			"message": "This configuration doesn't follow the required { elastic: { index: {} } } format."
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

// Get an indexed object
router.get('/get/:config/:id', (req, res) => {
	const config = req.params.config;
	const id = req.params.id;

// TODO: FINISH
	// if (config === "valid" && id) {
	// 	res.status(200).send({
	// 		"_id": config,
	// 		"config": "mockConfigData"
	// 	});
	// }
	// else {
	// 	res.status(400).send({
	// 		"method": "getObject",
	// 		"message": "This configuration doesn't exist.",
	// 		"config": config,
	// 		"success": false
	// 	});
	// }
});

// Create a new index
router.post('/index/:config', (req, res) => {
	const config = req.params.config;

	if (config === "valid") {
		res.status(200).send({
			"acknowledged": true,
			"shards_acknowledged": true
		});
	}
	else {
		res.status(400).send({
			"method": "createIndex",
			"success": false,
			"message": `This configuration doesn't exist: ${config}`
		});
	}
});

// Delete an index
router.delete('/index/:config', (req, res) => {
	const config = req.params.config;

	if (config === "valid") {
		res.status(200).send({
			"acknowledged": true
		});
	}
	else {
		res.status(404).send({
			"method": "deleteIndex",
			"success": false,
			"message": `This configuration doesn't exist: ${config}`
		});
	}
});

// Index an existing stored object
router.post('/config/:config', (req, res) => {
	const config = req.params.config;

	if (config === "valid") {
		res.status(200).send({
			// How should this look?
		});
	}
	else {
		res.status(400).send({
			"method": "indexObject",
			"success": false,
			"message": `This configuration doesn't exist: ${config}`
		});
	}
});

// Index all objects in MongoDB
router.put('/index/all/:config', (req, res) => {
	const config = req.params.config;

	if (config === "valid") {
		res.status(200).send({
			// How should this look?
		});
	}
	else {
		res.status(400).send({
			"method": "indexObject",
			"success": false,
			"message": `This configuration doesn't exist: ${config}`
		});
	}
});

// Index a list of objects
router.put('/index/bulk/:config', (req, res) => {
	const config = req.params.config;
	const payload = req.body;

	if (!payload.constructor === Array) {
		res.status(400).send({
			"method": "indexBulkObjects",
			"success": false,
			"message": "The payload must be an array of objects."
		});
		return;
	}

	if (config === "valid") {
		res.status(200).send({
			// How should this look?
		});
	}
	else {
		res.status(400).send({
			"method": "indexBulkObjects",
			"success": false,
			"message": `This configuration doesn't exist: ${config}`
		});
	}
});

// Define a mapping in elasticsearch
router.put('/mapping/:config', (req, res) => {
	const config = req.params.config;
	const payload = req.body;

	if (config === "valid") {
		res.status(200).send({
			// How should this look?
		});
	}
	else {
		res.status(400).send({
			"method": "indexBulkObjects",
			"success": false,
			"message": `This configuration doesn't exist: ${config}`
		});
	}
});

// Search object
router.put('/search/:config', (req, res) => {
	const config = req.params.config;
	const payload = req.body;

	if (config === "valid") {
		res.status(200).send({
		  	"_shards": {
		    	"total": 5,
		    	"failed": 0,
		    	"successful": 5
		  	},
		  	"hits": {
		    	"hits": [],
		    	"total": 0,
		    	"max_score": null
		  	},
		  	"took": 111,
		  	"timed_out": false
		});
	}
	else {
		res.status(400).send({
			"method": "indexBulkObjects",
			"success": false,
			"message": `This configuration doesn't exist: ${config}`
		});
	}
});

// TODO: Add Scroll endpoints - these are too undefined right now for stubbing


function checkNested(obj, /*, level1, level2, ... levelN*/) {
	const args = Array.prototype.slice.call(arguments, 1);

  	for (let i = 0; i < args.length; i++) {
    	if (!obj || !obj.hasOwnProperty(args[i])) {
      		return false;
    	}
    	obj = obj[args[i]];
  	}
  	return true;
}



module.exports = router;