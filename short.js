'use strict';

const tAppFunc = require('./function_index');

module.exports = function(app, db) {
  app.get('/u/:shortURL', (req, res) => {
    let shortURL = req.params.shortURL;
    tAppFunc.getLongURL(db, shortURL, (err, longURL) => {
      if (err === '404') {
        let templateVars = {
          title: '404 Not Found!',
          shortURL: shortURL
        };
        res.status(404).render('404', templateVars);
      } else {
        if(longURL.indexOf('http://') === -1) {
          longURL = 'http://' + longURL;
        }
        res.status(302).redirect(longURL);
      }
    });
  });
}