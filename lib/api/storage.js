// TODO: DRY some of this
// Add param reqs to routes that have them instead of responding manually?

const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'temp/' });

// Make this flexible based on Storage?
const pinfo = require('../../package');
const { version } = pinfo;

router.get('/', (req, res) => {
  res.send({ 'Storage Version': version });
});

// Get all drawers
router.get('/drawer', (req, res) => {
  res.status(200).json([]);
});

// Get drawer
router.get('/drawer/:name', (req, res) => {
  const name = req.params.name;

  if (name === 'valid') {
    res.status(200).send({
      owner: {
        displayName: '',
        id: '02d6176db174dc93cb1b899f7c6078f08654445fe8cf1b6ce98d8855f66bdbf4',
      },
      created: '2018-11-25 18:42:51.000865Z',
      name,
    });
  } else {
    res.status(400).send({
      drawer: name,
      method: 'getDrawer',
      message: `The following drawer doesn't exist: ${name}`,
      success: false,
    });
  }
});

// Create a drawer
router.put('/drawer/:name', (req, res) => {
  const name = req.params.name;

  if (name === 'valid') {
    res.status(201).send({
      name,
    });
  } else {
    res.status(400).send({
      drawer: name,
      method: 'createDrawer',
      message: `The following drawer already exists: ${name}`,
      success: false,
    });
  }
});

// Delete a drawer
router.delete('/drawer/:name', (req, res) => {
  const name = req.params.name;

  if (name === 'valid') {
    res.status(200).send({
      success: true,
    });
  } else {
    res.status(400).send({
      drawer: name,
      method: 'deleteDrawer',
      message: `The following drawer doesn't exist: ${name}`,
      success: false,
    });
  }
});

// List all nodes in a drawer
router.get('/drawer/nodes/:name', (req, res) => {
  // query: prefix - not required
  const name = req.params.name;

  if (name === 'valid') {
    res.status(200).send([]);
  } else {
    res.status(400).send({
      drawer: name,
      method: 'listNodes',
      message: `The following drawer doesn't exist: ${name}`,
      success: false,
    });
  }
});

// Get node
router.get('/node/:name', (req, res) => {
  // query: id - required
  const drawerName = req.params.name;
  const nodeId = req.query.id;

  if (!nodeId) {
    res.status(400).send({
      timestamp: Date.now(),
      status: 400,
      error: 'Bad Request',
      message: "Required String parameter 'id' is not present",
      path: `/api/1.0/node/${drawerName}`,
    });
    return;
  }

  if (drawerName === 'valid') {
    if (nodeId === 'valid') {
      res.status(200).send({
        size: 3832,
        drawer: drawerName,
        modified: '2018-11-25 19:12:44.000000Z',
        etag: '8dd1f234e146174ca3ac1a87c8768f62',
        id: nodeId,
      });
    } else {
      res.status(400).send({
        drawer: drawerName,
        method: 'getNode',
        message: `The following object doesn't exist '${nodeId}' in the drawer '${drawerName}'`,
        success: false,
      });
    }
  } else {
    res.status(400).send({
      drawer: drawerName,
      method: 'getNode',
      message: `The following drawer doesn't exist: ${drawerName}`,
      success: false,
    });
  }
});

// Create node
router.post('/node/:name', [
  upload.single('file'),
  (req, res) => {
    const drawerName = req.params.name;
    const nodeId = req.query.id || req.query.generateId;
    // params: id, generateStruct, generateId, replace?
    // multipart/form-data
    if (req.file) {
      if (drawerName === 'valid') {
        if (nodeId) {
          res.status(201).send({
            size: 3832,
            drawer: drawerName,
            modified: '2018-11-29 19:40:04.000000Z',
            etag: '8dd1f234e146174ca3ac1a87c8768f62',
            id: nodeId || '6d2335fe-df77-47f5-80fb-6b64cbc38a12',
          });
        } else {
          res.status(400).send({
            drawer: drawerName,
            method: 'createNode',
            message: 'You must provide a node id, or to ask to generate one.',
            success: false,
          });
        }
      } else {
        res.status(400).send({
          drawer: drawerName,
          method: 'createNode',
          message: `The following drawer doesn't exist: ${drawerName}`,
          success: false,
        });
      }
    } else {
      // Storage currently has nothing to validate file or file size
      // but we are adding some basic validation
      res.status(415).send({ error: 'Your request must include a file' });
    }
  },
]);

// Update node
router.put('/node/:name', [
  upload.single('file'),
  (req, res) => {
    const drawerName = req.params.name;
    const nodeId = req.query.id || req.query.generateId;
    // params: id, generateStruct, generateId, replace?
    // multipart/form-data
    if (req.file) {
      if (drawerName === 'valid') {
        if (nodeId && nodeId === 'valid') {
          res.status(201).send({
            success: true,
            id: nodeId,
          });
        } else if (nodeId) {
          res.status(400).send({
            drawer: drawerName,
            method: 'updateNode',
            message: `The following object doesn't exist '${nodeId}' in the drawer '${drawerName}'`,
            success: false,
          });
        } else {
          res.status(400).send({
            drawer: drawerName,
            method: 'updateNode',
            message: 'You must provide a node id, or to ask to generate one.',
            success: false,
          });
        }
      } else {
        res.status(400).send({
          drawer: drawerName,
          method: 'updateNode',
          message: `The following drawer doesn't exist: ${drawerName}`,
          success: false,
        });
      }
    } else {
      // Storage currently has nothing to validate file or file size
      // but we are adding some basic validation
      res.status(415).send({ error: 'Your request must include a file' });
    }
  },
]);

// Delete node
router.delete('/node/:name', (req, res) => {
  // params: id - required
  const drawerName = req.params.name;
  const nodeId = req.query.id;
  if (nodeId) {
    if (drawerName === 'valid') {
      if (nodeId === 'valid') {
        res.status(200).send({
          success: true,
        });
      } else {
        res.status(400).send({
          drawer: drawerName,
          method: 'deleteNode',
          message: `The following object doesn't exist '${nodeId}' in the drawer '${drawerName}'`,
          success: false,
        });
      }
    } else {
      res.status(400).send({
        drawer: drawerName,
        method: 'deleteNode',
        message: `The following drawer doesn't exist: ${drawerName}`,
        success: false,
      });
    }
  } else {
    res.status(400).send({
      timestamp: Date.now(),
      status: 400,
      error: 'Bad Request',
      message: "Required String parameter 'id' is not present",
      path: `/api/1.0/node/${drawerName}`,
    });
  }
});

// Download node
router.get('/node/:name/dl', (req, res) => {
  // params: id - required
  const drawerName = req.params.name;
  const nodeId = req.query.id;
  if (nodeId) {
    if (drawerName === 'valid') {
      if (nodeId === 'valid') {
        // TODO: Reply with a fake blob?
        res.status(200).send({
          success: true,
        });
      } else {
        res.status(400).send({
          drawer: drawerName,
          method: 'downloadNode',
          message: `The following object doesn't exist '${nodeId}' in the drawer '${drawerName}'`,
          success: false,
        });
      }
    } else {
      res.status(400).send({
        drawer: drawerName,
        method: 'downloadNode',
        message: `The following drawer doesn't exist: ${drawerName}`,
        success: false,
      });
    }
  } else {
    res.status(400).send({
      timestamp: Date.now(),
      status: 400,
      error: 'Bad Request',
      message: "Required String parameter 'id' is not present",
      path: `/api/1.0/node/${drawerName}/dl`,
    });
  }
});

// Copy node
router.put('/node/copy/:source/:target', (req, res) => {
  // params: id - required
  const sourceDrawerName = req.params.source;
  const targetDrawerName = req.params.target;
  const sourceNodeId = req.query.sourceId;
  const targetNodeId = req.query.targetId || req.query.generateId;

  if (sourceNodeId) {
    if (sourceDrawerName === 'valid' && targetDrawerName === 'valid') {
      if (sourceNodeId === 'valid' && targetNodeId) {
        res.status(200).send({
          sourceId: sourceNodeId,
          sourceDrawerName,
          targetId: targetNodeId,
          success: true,
          targetDrawerName,
        });
      } else if (sourceNodeId) {
        res.status(400).send({
          drawer: sourceDrawerName,
          method: 'createNode',
          message: 'You must provide a target node id, or to ask to generate one.',
          success: false,
        });
      } else {
        res.status(400).send({
          drawer: sourceDrawerName,
          method: 'createNode',
          message: `The following object doesn't exist '${sourceNodeId}' in the drawer '${sourceDrawerName}'`,
          success: false,
        });
      }
    } else {
      res.status(400).send({
        drawer: sourceDrawerName,
        method: 'createNode',
        message: `The following drawer doesn't exist: ${sourceDrawerName}`,
        success: false,
      });
    }
  } else {
    res.status(400).send({
      timestamp: Date.now(),
      status: 400,
      error: 'Bad Request',
      message: "Required String parameter 'sourceId' is not present",
      path: `/api/1.0/node/copy/${sourceDrawerName}/${targetDrawerName}`,
    });
  }
});


module.exports = router;
