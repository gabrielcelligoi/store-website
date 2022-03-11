DROP TABLE IF EXISTS sellers CASCADE;
DROP TABLE IF EXISTS sale CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS cards CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  postal VARCHAR(255) NOT NULL
);

CREATE TABLE cards (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  number BIGINT NOT NULL,
  exp_date VARCHAR(255) NOT NULL,
  cvc VARCHAR(255) NOT NULL
);

CREATE TABLE sellers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  bank_account INTEGER NOT NULL,
  routing INTEGER NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES sellers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image TEXT NOT NULL,
  rating INTEGER,
  weight INTEGER
);


CREATE TABLE sale (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  product_id INTEGER REFERENCES products(id) NOT NULL,
  shipping_cost INTEGER,
  country VARCHAR(255),
  street VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  postal VARCHAR(255),
  shipping_date DATE DEFAULT NOW() + INTERVAL '2 DAY'
);
