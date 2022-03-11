DROP TABLE IF EXISTS sellers CASCADE;
DROP TABLE IF EXISTS sale CASCADE;

CREATE TABLE sellers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  bank_account INTEGER NOT NULL,
  routing INTEGER NOT NULL
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