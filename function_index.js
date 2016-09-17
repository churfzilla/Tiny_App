'use strict';

//Generates a random 6 character string ----------------------------------------------
exports.generateRandomString = function(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 6; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};
//GETs The long & short URL from MongoDb------------------------------------------------
exports.getURLs = function(db, cb) {
  db.collection('urls').find().toArray((err, result) => {
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
      return cb('not_found', undefined);
    }
    else {
      return cb(null, result.longURL);
    }
  });
}
//Insert New URL to MongoDb----------------------------------------------------------
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
    { $set: { 'longURL': longURL }
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

