'use strict';
const tAppFunc = require('./function_index');
//Renders the creation/new URL form page -------------------------------------
module.exports = function(app, db) {
  app.get('/urls/new', (req, res) => {
    let templateVars = { title: 'Create New Tiny URL' };
    res.render('urls_new', templateVars);
  });
//POST Request to express server ----------------------------------------------
  app.post('/urls', (req, res) => {
    let longURL = req.body.longURL;
    tAppFunc.insertURL(db, longURL, (err, result) => {
      res.redirect('/urls');
    });
  });
//GET Requests to express server ------------------------------------------------
  app.get('/', (req, res) => {
    res.redirect('/urls');
  });
//GETs The index page -----------------------------------------------------------
  app.get('/urls', (req, res) => {
    tAppFunc.getURLs(db, (err, URLs) => {
      let templateVars = {
        urls: URLs
      };
      res.render('urls_index', templateVars);
    });
  });
//GETs the short URL to redirct to the long URL link -----------------------------
  app.get('/urls/:id', (req, res) => {
    let shortURL = req.params.id;
    tAppFunc.getLongURL(db, shortURL, (err, longURL) => {
      let templateVars = {
        shortURL: shortURL,
        longURL: longURL
      };
      res.render('urls_show', templateVars);
    });
  });
//PUTs changes to the Edited URLs --------------------------------------------------
  app.put('/urls/:id', (req, res) => {
    let shortURL = req.params.id;
    let longURL = req.body.url;
    tAppFunc.updateURL(db, shortURL, longURL, (err, result) => {
      res.redirect('/urls');
    });
  });
//DELETES URLs from the server ------------------------------------------------------
  app.delete('/urls/:id', (req, res) => {
    let shortURL = req.params.id;
    tAppFunc.deleteURL(db, shortURL, (err,result) => {
      res.redirect('/urls');
    });
  });
//GETs the JSON ---------------------------------------------------------------------
  app.get('/urls.json', (req, res) => {
    tAppFunc.getURLs(db, (err, URLs) => {
      res.json(URLs);
    });
  });
}