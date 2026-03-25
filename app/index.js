const express = require('express');
const app = express();

const VERSION = process.env.APP_VERSION || "blue";

app.get('/', (req, res) => {
  res.send(`App versión: ${VERSION}`);
});

app.listen(3000, () => {
  console.log(`Running ${VERSION}`);
});