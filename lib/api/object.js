const crypto = require('crypto');
const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'temp/' });

// Make this flexible based on Object?
const pinfo = require('../../package');
const { version } = pinfo;

// this is a tmp objects store that gets overwritten with requests
let tmpObjs = {};

router.get('/', (req, res) => {
  res.send({ 'Object Version': version });
});

// Bulk import of objects from a CSV file
router.post('/bulk/:db/:collection', [
  upload.single('file'),
  (req, res) => {
    const db = req.params.db;
    const collection = req.params.collection;

    const objs = [
      crypto.randomBytes(12).toString('hex'),
      crypto.randomBytes(12).toString('hex'),
      crypto.randomBytes(12).toString('hex'),
    ];

    if (req.file) {
      res.status(201).send({
        inserted: objs.length,
        ids: objs,
      });
    } else {
      res.status(400).send({
        timestamp: Date.now(),
        status: 400,
        error: 'Bad Request',
        message: "Required request part 'csv' is not present",
        path: `/api/1.0/bulk/${db}/${collection}`,
      });
    }
  },
]);

// Create a list of objects
router.post('/multi/:db/:collection', (req, res) => {
  const db = req.params.db;
  const collection = req.params.collection;
  const payload = req.body;

  if (payload.constructor === Array) {
    if (payload.length > 0) {
      res.status(201).send({
        inserted: payload.length,
        items: payload.map((item) => {
          const inserted = item;
          inserted._id = {
            $oid: crypto.randomBytes(12).toString('hex'),
          };
          return inserted;
        }),
      });
    } else {
      res.status(400).send({
        method: 'createObjects',
        message: 'The array cannot be empty.',
        success: false,
        db,
        collectionName: collection,
      });
    }
  } else {
    res.status(400).send({
      method: 'createObjects',
      message: "A JSONArray text must start with '[' at 1 [character 2 line 1]",
      success: false,
      db,
      collectionName: collection,
    });
  }
});

// Aggregate objects
router.post('/:db/:collection/aggregate', (req, res) => {
  const db = req.params.db;
  const collection = req.params.collection;

  const payload = req.body;
  const objs = Object.values(tmpObjs);

  if (db && collection) {
    if (payload.constructor === Array) {
      res.status(200).send({
        items: objs,
      });
    } else {
      res.status(400).send({
        method: 'aggregate',
        message: "A JSONArray text must start with '[' at 1 [character 2 line 1]",
        success: false,
        db,
        collectionName: collection,
      });
    }
  } else {
    res.status(404).send({
      method: 'aggregate',
      message: `The collection, ${collection}, does not exist`,
      success: false,
      db,
      collectionName: collection,
    });
  }
});

// Count objects
router.post('/:db/:collection/count', (req, res) => {
  const db = req.params.db;
  const collection = req.params.collection;

  const objs = Object.values(tmpObjs);

  if (db && collection) {
    res.status(200).send({
      count: objs.length,
    });
  } else {
    res.status(404).send({
      method: 'count',
      message: `The collection, ${collection}, does not exist`,
      success: false,
      db,
      collectionName: collection,
    });
  }
});

// Get distinct values from a specified field
router.post('/:db/:collection/distinct/:field', (req, res) => {
  const db = req.params.db;
  const collection = req.params.collection;
  const field = req.params.field;

  if (db && collection) {
    if (field) {
      res.status(200).send([]);
    } else {
      res.status(404).send({
        method: 'distinct',
        message: `The field, ${field}, does not exist`,
        success: false,
        db,
        collectionName: collection,
      });
    }
  } else {
    res.status(404).send({
      method: 'distinct',
      message: `The collection, ${collection}, does not exist`,
      success: false,
      db,
      collectionName: collection,
    });
  }
});

// Find Objects
router.post('/:db/:collection/find', (req, res) => {
  const db = req.params.db;
  const collection = req.params.collection;

  const objs = Object.values(tmpObjs);

  if (db && collection) {
    res.status(200).send({
      total: objs.length,
      items: objs,
    });
  } else {
    res.status(404).send({
      total: 0,
      items: [],
    });
  }
});

// Search object(s) using query parameters (instead of post)
router.get('/:db/:collection/search', (req, res) => {
  const db = req.params.db;
  const collection = req.params.collection;

  const objs = Object.values(tmpObjs);

  if (db && collection) {
    res.status(200).send({
      total: objs.length,
      items: objs,
    });
  } else {
    res.status(404).send({
      total: 0,
      items: [],
    });
  }
});

// Create an object
router.post('/:db/:collection', (req, res) => {
  const payload = req.body;

  // TODO: Should we verify this isn't empty? Object doesn't.
  if (payload) {
    payload._id = {
      $oid: crypto.randomBytes(12).toString('hex'),
    };
    tmpObjs[payload._id.$oid] = payload;
    res.status(201).send(payload);
  } else {
    res.status(400).send({
      method: 'createObject',
      message: 'The payload is invalid.',
      success: false,
    });
  }
});

// Delete Collection
router.delete('/:db/:collection', (req, res) => {
  const db = req.params.db;
  const collection = req.params.collection;

  if (db && collection) {
    tmpObjs = {};
    res.status(200).send({
      success: true,
    });
  } else {
    res.status(404).send({
      method: 'deleteCollection',
      message: `Collection '${collection}' does not exist`,
      success: false,
      db,
      collectionName: collection,
    });
  }
});

// Get all objects in collection
router.get('/:db/:collection', (req, res) => {
  const db = req.params.db;
  const collection = req.params.collection;

  const objs = Object.values(tmpObjs);

  if (db && collection) {
    res.status(200).send({
      total: objs.length,
      items: objs,
    });
  } else {
    res.status(404).send({
      method: 'getCollection',
      message: `The collection, ${collection}, does not exist`,
      success: false,
      db,
      collectionName: collection,
    });
  }
});

// Get object
router.get('/:db/:collection/:id', (req, res) => {
  const db = req.params.db;
  const collection = req.params.collection;
  const id = req.params.id;
  const found = tmpObjs[id];

  if (db && collection) {
    if (found) {
      res.status(200).send(found);
    } else {
      res.status(404).send({
        method: 'getObject',
        message: `The object, ${id}, doesn't exist in the collection, ${collection}`,
        success: false,
        db,
        collectionName: collection,
      });
    }
  } else {
    res.status(404).send({
      method: 'getObject',
      message: `The collection, ${collection}, does not exist`,
      success: false,
      db,
      collectionName: collection,
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
    $oid: id,
  };

  if (db && collection) {
    tmpObjs[payload._id.$oid] = payload;
    res.status(201).send(payload);
  } else {
    res.status(404).send({
      method: 'createObjectWithId',
      message: `The collection, ${collection}, does not exist`,
      success: false,
      db,
      collectionName: collection,
    });
  }
});

// Update object with id
router.put('/:db/:collection/:id', (req, res) => {
  const db = req.params.db;
  const collection = req.params.collection;
  const id = req.params.id;
  const payload = req.body;
  payload._id = {
    $oid: id,
  };

  if (db && collection) {
    tmpObjs[id] = payload;
    res.status(200).send(payload);
  } else {
    res.status(404).send({
      method: 'updateObject',
      message: `The collection, ${collection}, does not exist`,
      success: false,
      db,
      collectionName: collection,
    });
  }
});

// Delete object
router.delete('/:db/:collection/:id', (req, res) => {
  const db = req.params.db;
  const collection = req.params.collection;
  const id = req.params.id;
  const found = tmpObjs[id];

  if (db && collection) {
    if (found) {
      delete tmpObjs[id];
      res.status(200).send({
        deleted: 1,
        success: true,
      });
    } else {
      res.status(404).send({
        method: 'deleteObject',
        message: `The object, ${id}, doesn't exist in the collection, ${collection}`,
        success: false,
        db,
        collectionName: collection,
      });
    }
  } else {
    res.status(404).send({
      method: 'deleteObject',
      message: `The collection, ${collection}, does not exist`,
      success: false,
      db,
      collectionName: collection,
    });
  }
});

module.exports = router;
