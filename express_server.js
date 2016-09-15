const express = require("express");
const app = express();
app.set("view engine", "ejs");
const PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//Generates a random string of 6 characters - when using insure it checks if string exists
function generateRandomString(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 6; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.listen(PORT, () => {
  console.log(`Tiny app listening on port ${PORT}!`);
});
//INDEX PAGE
app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});
//SHOW PAGE
app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id };
  res.render("urls_show", templateVars);
});
//NEW URL PAGE
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});
//POSTING FORM
app.post("/urls", (req, res) => {
  console.log(req.body);  // debug statement to see POST parameters
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});


// app.get("/urls/:id", (req, res) => {
//   let templateVars = { shortURL: req.params.id };
//   res.render("urls_show", templateVars);
// });

// var urlDatabase = {
// "b2xVn2": "http://www.lighthouselabs.ca",
// "9sm5xK": "http://www.google.com"
// };

// app.get("/urls", (req, res) => {
//   let templateVars = { urls: urlDatabase };
//   res.render("urls_index", templateVars);
// });
