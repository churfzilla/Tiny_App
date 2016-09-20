'use strict';
//Generates a random 6 character string ----------------------------------------------
function generateRandomString() {
  return Math.random().toString(36).substr(2,6);
}
exports.insertURL = function(db, longURL, cb) {
  let newURL = {
    shortURL: generateRandomString(),
    longURL: longURL
  }
  db.collection('urls').insertOne(newURL, (err, result) => {
    if (err) {
      return cb(err);
    }
    return cb(null, result);
  });
}
//Update Existing URL MongoDb----------------------------------------------------------
exports.updateURL = function(db, shortURL, longURL, cb) {
  db.collection('urls').updateOne(
    { 'shortURL': shortURL },
    {$set: { 'longURL': longURL }
    }, (err, result) => {
      if (err) {
        return cb(err);
      }
      return cb(null, result);
  });
}
//Delete Existing URL MongoDb----------------------------------------------------------
exports.deleteURL = function(db, shortURL, cb) {
  db.collection('urls').remove({ 'shortURL': shortURL }, (err, result) => {
    if (err) {
      return cb(err);
    }
    return cb(null, result);
  });
}
//Gets the long URL from the short URL's MongoDb document----------------------------------
exports.getLongURL = function(db, shortURL, cb) {
  let query = { 'shortURL': shortURL };
  db.collection('urls').findOne(query, (err, result) => {
    if (err) {
      return cb(err);
    }
    if (result === null) {
      return cb('404', undefined);
    } else {
      return cb(null, result.longURL);
    }
  });
}
//GETs The long & short URL from MongoDb------------------------------------------------
exports.getURLs = function(db, cb) {
  db.collection('urls').find().toArray((err, result) => {
    if (err) {
      return cb(err);
    }
    return cb(null, result);
  });
}
