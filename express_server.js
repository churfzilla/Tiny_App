var express = require("express");
var app = express();
app.set("view engine", "ejs");
var PORT = process.env.PORT || 8080; // default port 8080



app.listen(PORT, () => {
  console.log(`Tiny app listening on port ${PORT}!`);
});
app.get('/urls', (req, res) => {
    var urlDatabase = [
        { shortUrl: "b2xVn2", fullUrl: "http://www.lighthouselabs.ca" },
        { shortUrl: "9sm5xK", fullUrl: "http://www.google.com" }
    ];
    var tagline = "Displaying my links.";

    res.render('urls_index', {
        urlDatabase: urlDatabase,
        tagline: tagline
    });
});

// var urlDatabase = {
// "b2xVn2": "http://www.lighthouselabs.ca",
// "9sm5xK": "http://www.google.com"
// };

// app.get("/urls", (req, res) => {
//   let templateVars = { urls: urlDatabase };
//   res.render("urls_index", templateVars);
// });
