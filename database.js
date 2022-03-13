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

const getProduct = function(id) {
  return db.query(`
  SELECT *
  FROM products
  WHERE id = $1;
  `, [id])
  .then(product => {
    return product.rows
  })
  .catch(error => {
    console.log(error.message)
  })
}

const createListing = function(values) {
  return db.query(`
  INSERT INTO products (seller_id, name, description, price, stock, image)
  VALUES ($1, $2, $3, $4, $5, $6);
  `, values)
  .then(product => {
    return product.rows
  })
  .catch(error => {
    console.log(error.message)
  })
}

module.exports = { getUserWithEmail, getProduct, createListing };
