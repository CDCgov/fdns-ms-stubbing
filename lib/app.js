const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3002,
    bodyParser = require('body-parser');

const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes');
routes(app);

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT + '!');
});