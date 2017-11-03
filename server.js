// server.js
const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
var port = process.env.port || 4200;
app.listen(port,function () {
  console.log('Example app listening on port ' + port)
});
