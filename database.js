// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();


const getUserWithEmail = function(email) {
  return db.query(`
  SELECT *
  FROM users
  WHERE email = $1;
  `, [email])
  .then(data => {
    return data.rows[0];
  })
  .catch(error => {
    console.log(error.message);
  });
};

module.exports = { getUserWithEmail };
