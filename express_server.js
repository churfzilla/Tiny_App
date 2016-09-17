'use strict';
//Required npm packages --------------------------------------------------
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/url_shortener";
const tAppFunc = require('./function_index');
//Connection PORT to express server ---------------------------------------
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let db;
//Initializing MongoDb Connection ------------------------------------------
MongoClient.connect(MONGODB_URI, (err, dbInstance) => {
  if (err) {
    console.log('Could not connect to the database! Details below.', err, 'The application will now exit.');
    process.exit();
  }
  db = dbInstance;
  require('./express_functions')(app, db);
  require('./short')(app, db);
  // Initiate server
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });
});