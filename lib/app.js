const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const cors = require('cors');

app.use(cors());
app.options('*', cors());

const routes = require('./routes');
routes(app);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
