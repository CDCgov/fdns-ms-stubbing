const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const pinfo = require('../../package');
const { version } = pinfo;

router.get('/', (req, res) => {
	res.send({ 'CDA Utils Version': version });
});

// Generate random CDA message
router.get('/generate', (req, res) => {
	res.type('application/xml');
	// Send generic test XML
	res.status(200).send('<?xml version="1.0" encoding="UTF-8"?>');
});

// Transform CDA to JSON
router.post('/json', bodyParser.text({type: '*/*'}), (req, res) => {
	const xml = req.body;
	if (xml) {
		// Assumes you are passing XML because the way to validate XML in Node is not lightweight
		res.status(200).send({
			"extractor": {
		    	"version": "1.0.0",
		    	"hash": "testHash",
		    	"UCID": {
		      		"id": "EMPTY",
		      		"hash": "testHash"
		    	},
		    	"timestamp": 1234567890
		  	},
		  	"message": {
		  		"CDA": "testData"
		  	}
		});
	}
	else {
		const message = "Must contain a body that is valid XML.";
		sendError(res, "transformCDAtoJSON", message);
	}
});

function sendError(res, method, message) {
	res.status(400).send({
		"method": method,
		"message": message,
		"success": false
	});
}

module.exports = router;