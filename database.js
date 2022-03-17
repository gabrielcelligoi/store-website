// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();


const getUserWithEmail = function(email) {
  return db.query(`
  SELECT users.*, sellers.id as seller_id
  FROM users
  LEFT JOIN sellers ON users.id = user_id
  WHERE email = $1;
  `, [email])
  .then(data => {
    return data.rows[0];
  })
  .catch(error => {
    console.log(error.message);
  });
};

const getUserById = function(id) {
  return db.query(`
  Select *
  FROM users
  WHERE id = $1;
  `, [id])
  .then(data => {
    return data.rows[0];
  })
  .catch(error => {
    console.log(error.message)
  })
}

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
    // console.log(products.rows)
    return products.rows;
  })
}

const getProductsBySellerId = function(id) {
  return db.query(`
  SELECT *
  FROM products
  WHERE seller_id = $1
  `, [id])
  .then(products => {
    return products.rows
  })
}

const deleteProductBySellerId = function(seller_id, product_id) {
  return db.query(`
  DELETE
  FROM products
  WHERE seller_id = $1 AND id = $2;
  `, [seller_id, product_id])
  .then(products => {
    return products.rows
  })
}

const updateToSoldByProductId = function(id) {
  return db.query(`
  UPDATE products
  SET sold = true
  WHERE id = $1;
  `, [id])
  .then(products => {
    return products.rows
  })
}

const updateToNotSoldByProductId = function(id) {
  return db.query(`
  UPDATE products
  SET sold = false
  WHERE id = $1;
  `, [id])
  .then(products => {
    return products.rows
  })
}

const getAllProducts = function() {
  return db.query(`
  SELECT *
  FROM products;
  `)
  .then(products => {
    return products.rows
  })
}

const getProductsByName = function(str) {
  return db.query(`
  SELECT *
  FROM products
  WHERE name LIKE '%'||$1||'%';
  `, [str])
  .then(products => {
    return products.rows
  })
  .catch(error => {
    console.log(error.message)
  })
}

const getProductsByMinPrice = function(min) {
  return db.query(`
  SELECT *
  FROM products
  WHERE price > $1
  `, [min])
  .then(products => {
    return products.rows
  })
}

const getProductsByMaxPrice = function(max) {
  return db.query(`
  SELECT *
  FROM products
  WHERE price < $1
  `, [max])
  .then(products => {
    return products.rows
  })
}

const getProductsBetweenPrice = function(min,max) {
  return db.query(`
  SELECT *
  FROM products
  WHERE price BETWEEN $1 AND $2
  `, [min, max])
  .then(products => {
    return products.rows
  })
}

const getUserEmailByProductId = function(id) {
  return db.query(`
  SELECT products.name as subject, email
  FROM users
  JOIN sellers ON user_id = users.id
  JOIN products ON seller_id = sellers.id
  WHERE products.id = $1;
  `, [id])
  .then(result => {
    return result.rows
  })
}

const getUserEmailByUserId = function(id) {
  return db.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `, [id])
  .then(result => {
    return result.rows
  })
}

module.exports = { getUserWithEmail, getProduct, createListing, featuredProductsList, getUserById, getProductsBySellerId, deleteProductBySellerId, updateToSoldByProductId, updateToNotSoldByProductId, getAllProducts, getProductsByName, getProductsByMinPrice, getProductsByMaxPrice, getProductsBetweenPrice, getUserEmailByProductId, getUserEmailByUserId };
