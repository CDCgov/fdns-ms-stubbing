const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'temp/' });

// Make this flexible based on Object?
const pinfo = require('../../package');
const { version } = pinfo;

router.get('/', (req, res) => {
	res.send({ 'Object Version': version });
});

// Create an object
router.post('/:db/:collection', (req, res) => {
	const payload = req.body;

	// TODO: Should we verify this isn't empty? Object doesn't.
	if (payload) {
		payload._id = {
			"$oid": "5c0057247fa7b700017d7a62"
		}
		res.status(201).send(payload);
	}
	else {
		res.status(400).send({
			"method": "createObject",
			"message": `The payload is invalid.`,
			"success": false
		});
	}
});

// Delete Collection
router.post('/:db/:collection', (req, res) => {
	const db = req.params.db;
	const collection = req.params.collection;

	if (db === "valid" && collection === "valid") {
		res.status(200).send({
			"success": true
		});
	}
	else {
		res.status(404).send({
			"method": "deleteCollection",
			"message": `Collection '${collection}' does not exist`,
			"success": false,
			"db": db,
			"collectionName": collection
		});
	}
});

// Get all objects in collection
router.get('/:db/:collection', (req, res) => {
	const db = req.params.db;
	const collection = req.params.collection;

	if (db === "valid" && collection === "valid") {
		res.status(200).send({
		  	"total": 1,
		  	"items": [
		    	{
		      		"testData": "testData",
		      		"_id": {
		        		"$oid": "sample-object-id"
		      		}
		    	}
		  	]
		});
	}
	else {
		res.status(404).send({
			"method": "getCollection",
			"message": `The collection, ${collection}, does not exist`,
			"success": false,
			"db": db,
			"collectionName": collection
		});
	}
});

// Get object
router.get('/:db/:collection/:id', (req, res) => {
	const db = req.params.db;
	const collection = req.params.collection;
	const id = req.params.id;

	if (db === "valid" && collection === "valid") {
		if (id === "sample-object-id") {
			res.status(200).send({
	      		"testData": "testData",
	      		"_id": {
	        		"$oid": "sample-object-id"
	      		}
			});
		}
		else {
			res.status(404).send({
				"method": "getObject",
				"message": `The object, ${id}, doesn't exist in the collection, ${collection}`,
				"success": false,
				"db": db,
				"collectionName": collection
			})
		}
	}
	else {
		res.status(404).send({
			"method": "getObject",
			"message": `The collection, ${collection}, does not exist`,
			"success": false,
			"db": db,
			"collectionName": collection
		});
	}
});

// Create object with id
router.post('/:db/:collection/:id', (req, res) => {
	const db = req.params.db;
	const collection = req.params.collection;
	const id = req.params.id;
	const payload = req.body;
	// This route only fails if the chosen ID already exists or if there is a problem with mongo
	payload._id = {
		"$oid": id
	}
	res.status(201).send(payload);
});

// Update object with id
router.put('/:db/:collection/:id', (req, res) => {
	// This route only fails if there is a problem with mongo
	res.status(201).send(payload);
});

// Delete object
router.delete('/:db/:collection/:id', (req, res) => {
	const db = req.params.db;
	const collection = req.params.collection;
	const id = req.params.id;

	if (db === "valid" && collection === "valid") {
		if (id === "sample-object-id") {
			res.status(200).send({
	      		"deleted": 1,
	      		"success": true
			});
		}
		else {
			res.status(404).send({
				"method": "deleteObject",
				"message": `The object, ${id}, doesn't exist in the collection, ${collection}`,
				"success": false,
				"db": db,
				"collectionName": collection
			})
		}
	}
	else {
		res.status(404).send({
			"method": "deleteObject",
			"message": `The collection, ${collection}, does not exist`,
			"success": false,
			"db": db,
			"collectionName": collection
		});
	}
});

// Post object
router.post('/:db/:collection/aggregate', (req, res) => {
	const db = req.params.db;
	const collection = req.params.collection;

	const payload = req.body;

	if (db === "valid" && collection === "valid") {
		if (payload.constructor === Array) {
			res.status(200).send({
				"items": [
					{
				  		"testData": "testData",
				  		"_id": {
				    		"$oid": "sample-object-id"
				  		}
					}
				]
			});
		}
		else {
			res.status(400).send({
				"method": "aggregate",
				"message": "A JSONArray text must start with '[' at 1 [character 2 line 1]",
				"success": false,
				"db": db,
				"collectionName": collection
			});
		}
	}
	else {
		res.status(404).send({
			"method": "aggregate",
			"message": `The collection, ${collection}, does not exist`,
			"success": false,
			"db": db,
			"collectionName": collection
		});
	}
});

// Count objects
router.post('/:db/:collection/count', (req, res) => {
	const db = req.params.db;
	const collection = req.params.collection;

	if (db === "valid" && collection === "valid") {
		res.status(200).send({
			"count": 1
		});
	}
	else {
		res.status(404).send({
			"method": "count",
			"message": `The collection, ${collection}, does not exist`,
			"success": false,
			"db": db,
			"collectionName": collection
		});
	}
});

// Get distinct values from a specified field
router.post('/:db/:collection/distinct/:field', (req, res) => {
	const db = req.params.db;
	const collection = req.params.collection;
	const field = req.params.field;

	if (db === "valid" && collection === "valid") {
		res.status(200).send([]);
	}
	else {
		res.status(404).send({
			"method": "distinct",
			"message": `The collection, ${collection}, does not exist`,
			"success": false,
			"db": db,
			"collectionName": collection
		});
	}
});

// Find Objects
router.post('/:db/:collection/find', (req, res) => {
	const db = req.params.db;
	const collection = req.params.collection;

	if (db === "valid" && collection === "valid") {
		res.status(200).send({
			"total": 1,
			"items": [
				{
			  		"testData": "testData",
			  		"_id": {
			    		"$oid": "sample-object-id"
			  		}
				}
			]
		});
	}
	else {
		res.status(404).send({
			"total": 0,
			"items": []
		});
	}
});

// Search object(s) using query parameters (instead of post)
router.get('/:db/:collection/search', (req, res) => {
	const db = req.params.db;
	const collection = req.params.collection;

	if (db === "valid" && collection === "valid") {
		res.status(200).send({
			"total": 1,
			"items": [
				{
			  		"testData": "testData",
			  		"_id": {
			    		"$oid": "sample-object-id"
			  		}
				}
			]
		});
	}
	else {
		res.status(404).send({
			"total": 0,
			"items": []
		});
	}
});

// Bulk import of objects from a CSV file
router.post('/bulk/:db/:collection', [
	upload.single('file'),
	(req, res) => {
		const db = req.params.db;
		const collection = req.params.collection;

		if (req.file) {
			res.status(201).send({
				"inserted": 3,
				"ids": [
					"sample-object-id-1",
					"sample-object-id-2",
					"sample-object-id-3"
				]
			});
		}
		else {
			res.status(400).send({
				"timestamp": Date.now(),
				"status": 400,
				"error": "Bad Request",
				"message": "Required request part 'csv' is not present",
				"path": `/api/1.0/bulk/${db}/${collection}`
			});
		}
	}
]);


// Create a list of objects
router.post('/multi/:db/:collection', (req, res) => {
	const db = req.params.db;
	const collection = req.params.collection;
	const payload = req.body;

	if (payload.constructor === Array) {
		if (payload.length > 0) {
			res.status(201).send({
				"inserted": 1,
				"items": [
					{
				  		"testData": "testData",
				  		"_id": {
				    		"$oid": "sample-object-id"
				  		}
					}
				]
			});
		}
		else {
			res.status(400).send({
				"method": "createObjects",
				"message": "The array cannot be empty.",
				"success": false,
				"db": db,
				"collectionName": collection
			});
		}
	}
	else {
		res.status(400).send({
			"method": "createObjects",
			"message": "A JSONArray text must start with '[' at 1 [character 2 line 1]",
			"success": false,
			"db": db,
			"collectionName": collection
		});
	}
});



module.exports = router;