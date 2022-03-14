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

const featuredProductsList = function() {
  return db.query(`
  SELECT *
  FROM products
  WHERE is_featured = true AND id = 1 OR id = 2 OR id = 3;
  `)
  .then(products => {
    console.log(products.rows)
    return products.rows;
  })
}




module.exports = { getUserWithEmail, getProduct, createListing, featuredProductsList };


