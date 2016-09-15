const express = require("express");
const app = express();
app.set("view engine", "ejs");
const PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT, () => {
  console.log(`Tiny app listening on port ${PORT}!`);
});
app.get('/urls', (req, res) => {
    var urlDatabase = [
        { shortUrl: "b2xVn2", fullUrl: "http://www.lighthouselabs.ca" },
        { shortUrl: "9sm5xK", fullUrl: "http://www.google.com" }
    ];
    res.render('urls_index', {
        urlDatabase: urlDatabase,
    });
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

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
