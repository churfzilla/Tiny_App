const express = require("express");
const app = express();
app.set("view engine", "ejs");
const PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//Generates a random string of 6 characters - when using insure it checks if string exists
function generateRandomString(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 6; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/urls/new", (req, res) => {
 res.render("urls_new");
});

app.post("/urls", (req, res) => {
 urlDatabase[generateRandomString()] = req.body.longURL;
 res.redirect('/urls');
});

app.get('/urls', (req, res) => {
 let templateVars = { urls: urlDatabase };
 res.render('urls_index', templateVars);
});

app.get('/urls/:id', (req, res) => {
 let templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id] };
 res.render('urls_show', templateVars);
});

app.put('/urls/:id', (req, res) => {
 urlDatabase[req.params.id] = req.body.url;
 res.redirect('/urls');
});

app.delete('/urls/:id', (req, res) => {
 delete urlDatabase[req.params.id];
 res.redirect('/urls');
});

app.get("/u/:shortURL", (req, res) => {
 let longURL = urlDatabase[req.params.shortURL];
 if (longURL === undefined) {
   var templateVars = { shortURL: req.params.shortURL };
   res.status(404).render('not_found', templateVars);
 } else {
   res.status(301).redirect(longURL);
 }
});

app.get('/urls.json', (req, res) => {
 res.json(urlDatabase);
});

app.listen(PORT, () => {
 console.log(`Example app listening on port ${PORT}!`);
});