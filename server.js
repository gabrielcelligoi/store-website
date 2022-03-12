// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

//Body-parser
const bodyParser = require("body-parser");

//BCrypt
const bcrypt = require("bcryptjs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
// const registerRoutes = require("./routes/register");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// app.use("/api/register", registerRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/register", (req, res) => {
  res.render("register_view");
});

app.post("/register", (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userAddress = req.body.address;
  const userCountry = req.body.country;
  const userProvince = req.body.province;
  const userCity = req.body.city;
  const userPostal = req.body.postal;
  const userPasswordHashed = bcrypt.hashSync(userPassword, 10);
  const queryParams = [userName, userEmail, userPasswordHashed, userCountry, userAddress, userCity, userProvince, userPostal];

  return db.query(`
  INSERT INTO users (name, email, password, country, street, city, province, postal)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `, queryParams)
  .then(data => {
    return data.rows[0];
  })
  .catch(error => {
    console.log(error.message);
  })

});

app.get("/newlisting", (req, res) => {
  console.log("test");
  res.render("newlisting");
});
