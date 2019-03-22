const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('dist'));

app.get('*', function (req, res) {
  const index = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(index);
});

app.listen(process.env.PORT || 8080);
