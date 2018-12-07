const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'temp/' });

const pinfo = require('../../package');
const { version } = pinfo;

router.get('/', (req, res) => {
	res.send({ 'MSFT Utils Version': version });
});

// Extract text from DOCX
router.post('/docx/extract',[
	upload.single('file'),
	(req, res) => {
		const file = req.file;
		if (file) {
			res.status(200).send('Hello World!');
		}
		else {
			// MSFT utils returns a 406 if you have no file but that is not useful so we return a 415
			res.status(415).send({error: 'Your request must include a file'});
		}
	}
]);

// Extract data from XLSX to CSV
router.post('/xlsx/extract/csv',[
	upload.single('file'),
	(req, res) => {
		// This route requires the sheetRange and orientation to match the type of XLSX file passed along.
		// This could be fleshed out down the road but the validation is too complex to include here for now.
		const file = req.file;
		if (file) {
			// This returns a file in the live version, but we simply return a 200.
			res.status(200).send("This is a sample return that would be in your target data type.");
		}
		else {
			// MSFT utils returns a 406 if you have no file but that is not useful so we return a 415
			res.status(415).send({error: 'Your request must include a file'});
		}
	}
]);

// Extract data from XLSX to JSON
router.post('/xlsx/extract/json',[
	upload.single('file'),
	(req, res) => {
		// This route requires the sheetRange and orientation to match the type of XLSX file passed along.
		// This could be fleshed out down the road but the validation is too complex to include here for now.
		const file = req.file;
		if (file) {
			// This returns JSON in the live version, but we simply return a 200.
			res.status(200).send("This is a sample return that would be in your target data type.");
		}
		else {
			// MSFT utils returns a 406 if you have no file but that is not useful so we return a 415
			res.status(415).send({error: 'Your request must include a file'});
		}
	}
]);

// Transform a CSV to XLSX
router.post('/xlsx/from/csv',[
	upload.single('file'),
	(req, res) => {
		const file = req.file;
		if (file) {
			// This returns XLSX in the live version, but we simply return a 200.
			res.status(200).send("This is a sample return that would be in your target data type.");
		}
		else {
			// MSFT utils returns a 406 if you have no file but that is not useful so we return a 415
			res.status(415).send({error: 'Your request must include a file'});
		}
	}
]);

// Get the list of sheets
router.post('/xlsx/sheets',[
	upload.single('file'),
	(req, res) => {
		const file = req.file;
		if (file) {
			res.status(200).send({
  				"total": 1,
  				"items": [
    				{
      					"name": "Sheet1",
      					"index": 0
    				}
  				]
			});
		}
		else {
			// MSFT utils returns a 406 if you have no file but that is not useful so we return a 415
			res.status(415).send({error: 'Your request must include an XLSX file'});
		}
	}
]);

function sendError(res, method, message) {
	res.status(400).send({
		"method": method,
		"message": message,
		"success": false
	});
}

module.exports = router;
