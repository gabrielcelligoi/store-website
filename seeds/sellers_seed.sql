-- INSERT INTO users (name, email, password, country, street, city, province, postal)
-- VALUES
-- ('fran2','fran@fran.com','password','canada','canStreet','canCity','canProvince','wda341'),
-- ('fran3','fran@fran.com','password','canada','canStreet','canCity','canProvince','wda341'),
-- ('fran4','fran@fran.com','password','canada','canStreet','canCity','canProvince','wda341'),
-- ('fran5','fran@fran.com','password','canada','canStreet','canCity','canProvince','wda341'),
-- ('fran6','fran@fran.com','password','canada','canStreet','canCity','canProvince','wda341'),
-- ('fran7','fran@fran.com','password','canada','canStreet','canCity','canProvince','wda341'),
-- ('fran8','fran@fran.com','password','canada','canStreet','canCity','canProvince','wda341'),
-- ('fran9','fran@fran.com','password','canada','canStreet','canCity','canProvince','wda341'),
-- ('fran10','fran@fran.com','password','canada','canStreet','canCity','canProvince','wda341');

INSERT INTO sellers (user_id, bank_account, routing)
VALUES (2, 2346123, 238271),
(4, 2388292, 2959183),
(5, 2931843, 2304924),
(7, 2385175, 3821952);

-- INSERT INTO products (seller_id, name, description, price, stock, image, rating, weight)
-- VALUES
-- (1, 'toy1', 'bigtoy', 5, 1, 'pictureUrl', 5, '10'),
-- (2, 'toy2', 'bigtoy', 5, 1, 'pictureUrl', 5, '10'),
-- (2, 'toy3', 'bigtoy', 5, 1, 'pictureUrl', 5, '10'),
-- (1, 'toy4', 'bigtoy', 5, 1, 'pictureUrl', 5, '10'),
-- (1, 'toy5', 'bigtoy', 5, 1, 'pictureUrl', 5, '10'),
-- (3, 'toy6', 'bigtoy', 5, 1, 'pictureUrl', 5, '10'),
-- (1, 'toy7', 'bigtoy', 5, 1, 'pictureUrl', 5, '10'),
-- (4, 'toy8', 'bigtoy', 5, 1, 'pictureUrl', 5, '10');


-- INSERT INTO sale (user_id, product_id, shipping_cost, country, street, city, province, postal)
-- VALUES (1, 1, 10, 'canada', 'main st','hamilton','on', '23eew2'),
-- (3, 8, 10, 'canada2', 'main st', 'hamilton', 'on', '347dgw'),
-- (1, 5, 10, 'canada3', 'main st2', 'hamilton', 'on', '347dgw'),
-- (7, 1, 10, 'canada4', 'main st3', 'hamilton', 'on', '347dgw'),
-- (3, 8, 10, 'canada5', 'main st4', 'hamilton', 'on', '347dgw'),
-- (6, 3, 10, 'canada6', 'main st5', 'hamilton', 'on', '347dgw'),
-- (8, 4, 10, 'canada7', 'main st6', 'hamilton', 'on', '347dgw'),
-- (8, 3, 10, 'canada8', 'main st7', 'hamilton', 'on', '347dgw');
