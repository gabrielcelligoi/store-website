// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();


// const insertNewUser = function(arrayWithUserValues, cookieName) {
//   return db.query(`
//   INSERT INTO users (name, email, password, country, street, city, province, postal)
//   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//   RETURNING *;
//   `, arrayWithUserValues)
//   .then(data => {
//     cookieName = data.rows[0].id;
//     res.redirect("/");
//     return data.rows[0];
//   })
//   .catch(error => {
//     console.log(error.message);
//   })
// }

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
