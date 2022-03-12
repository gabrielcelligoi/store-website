const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/register", (req, res) => {
    res.send("<h1>teste</h1>")

  });
  return router;
};



