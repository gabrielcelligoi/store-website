INSERT INTO users (name, email, password, country, street, city, province, postal)
VALUES
('Eva Stanley', 'eva@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', 'Canada', '40 Bay St', 'Toronto', 'ON', 'M5J 2X2'),
('Louisa Meyer', 'ouisa@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', 'Canada', '777 Pacific Blvd', 'Vancouver', 'BC', 'V6B 4Y8'),
('Dominic Parks', 'ominic@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', 'Canada', '555 Saddledome Rise SE', 'Calgary', 'AB', 'T2G 2W1'),
('Sue Luna', 'ue@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', 'Canada', '315 Chancellor Matheson Rd', 'Winnipeg', 'MB', 'R3T 1Z2'),
('Rosalie Garza', 'osalie@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', 'Canada', '1015 Bank St', 'Ottawa', 'ON', 'K1S 3W7'),
('Etta West', 'tta@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', 'Canada', '4545 Pierre-de Coubertin Ave', 'Montreal', 'QC', 'H1V 0B2'),
('Leroy Hart', 'eroy@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', 'Canada', '290 Bremner Blvd', 'Toronto', 'ON', 'M5V 3L9');
INSERT INTO cards (user_id, brand, number, exp_date, cvc)
VALUES
(1, 'visa', 4485293917719087, '11/2028', 283),
(2, 'mastercard', 5529819757542059, '10/2024', 366),
(3, 'amex', 349749219895341, '1/2022', 274),
(4, 'visa', 4556553394973356, '11/2027', 201),
(5, 'mastercard', 5191182764704510, '2/2024', 144),
(6, 'amex', 374804070945152, '7/2026', 463),
(7, 'visa', 4024007144911368, '2/2023', 604),
(1, 'amex', 370206645957494, '11/2025', 431);

INSERT INTO sellers (user_id, bank_account, routing)
VALUES (2, 2346123, 238271),
(4, 2388292, 2959183),
(5, 2931843, 2304924),
(7, 2385175, 3821952);

INSERT INTO products (seller_id, name, description, price, stock, image, is_featured)
VALUES
(1, 'BALANCED LIFE Salmon Topper', 'Balanced Life Adult Rehydratable Salmon Dry Dog Food Topper 200g is a complete air dried raw, balanced, single meat protein diet made from Dr Bruce Syme''s combination of natural raw ingredients to mimic a natural prey diet.', 795, 50, 'https://marketplacer.imgix.net/mH/iyRlDMoVuXLb_QPN-FdlFSV-I.jpg?auto=format&fm=pjpg&fit=max&w=1200&h=1200&s=955be770d79a34b61ff0ae39948bf238', true),
(2, 'OLIVER JACKET - CAMO GOLD', 'Keep the dog, get rid of the smell! All of our textile-based products are coated with SILVERSHIELD™, a patented treatment that helps eliminate odor from pets and good for up to 100 washes.', 5900, 15, 'https://cdn.shopify.com/s/files/1/2222/5817/products/43_1200x1200.png?v=1631741021', true),
(3, 'Rogz Cuddle Oval Pod Green Small', 'Perfect for comfort-loving cats who love to sleep curled up in a ball! The classic styling of the Cuddle Oval Pod bed with soft Plush interior offers a safe and supportive quiet bed to call their own.', 2900, 20, 'https://marketplacer.imgix.net/qV/xooBBpny4SQG-HZ-xlDXv8Fzk.jpg?auto=format&fm=pjpg&fit=max&w=550&h=550&s=9d1ea9c3cd5a4d68f519ed086a03ec90', true),
(1, 'Furrytail Boss Cat Bed, Elevated Cat Chair', 'Let your pet cat feel like a boss when they relax and lounge around the Boss Cat Bed. A day bed that will give your pets comfort every time they want to chill during that quiet cold evening or breezy afternoon.', 8990, 10, 'https://marketplacer.imgix.net/Py/BZWViaRpp5oqKzmhejboZjFEo.jpg?auto=format&fm=pjpg&fit=max&w=1165&h=1500&s=219ff424aceb85045234ed3590847fde', true),
(2, 'Adventure Coat', 'What dog doesn''t love a good adventure? Whether it be a street walk, a good sniff around the park or some wilderness trekking, this coat will have you (or rather, your dog) covered. ', 4400, 3, 'https://zeedog.vteximg.com.br/arquivos/2022-zeedog-menu-dropdown-cachorros-roupas.png?v=637788997441930000', true),
(3, 'Coat Huskimo Basecamp', 'Waterproof; tear resistant; 900D Denier outer; thin; light; warm; 3M insulation; reinforced leash hole; reflective.', 3000, 15, 'https://zeedog.vteximg.com.br/arquivos/Yellow-winter-coat-main-02.jpg', false),
(3, 'Scratcher Playground', 'The fashion appearance is not enough! PETKIT sets car scratcher, tack, orange and green in one, satisfies all your cat''s needs by offering hours of fun and entertainment.', 4995, 7, 'https://zeedog.vteximg.com.br/arquivos/arranhador-para-gatos-citrus-zeecat-main-2.jpg', true),
(2, 'Roly-Poly', 'Too busy to play with kitty? The PIDAN® Roly-Poly will keep your cat preoccupied. This self-balancing toy stands upright whenever kitty knocks it down.', 2500, 22, 'https://zeedog.vteximg.com.br/arquivos/mint-zeecat-toy-teaser-main-2.jpg', false),
(1, 'Dog Bowl', 'Thoughtfully designed by Houndztooth for easy feeding and impeccable style. Suitable for both food and water.', 1995, 17, 'https://zeedog.vteximg.com.br/arquivos/comedouro-para-cachorros-tuff-bowl-verde-limao-zeedog-pet-main-03.jpg', false),
(2, 'Harness Air Fly', 'Soft breathable mesh neoprene chest plate. Quick dying, great for water play', 3200, 10, 'https://marketplacer.imgix.net/8E/BS27XiJST95m4rM2obPvF5fP4.jpg?auto=format&fm=pjpg&fit=max&w=1000&h=1000&s=37315bcb05582a1f4775c6f1e9e8415b', false),
(3, 'Breezy Cat Backpack', 'Healthy and durable material. Smart ventilation system features great air circulation. Inbuilt lamp with gradual illuminating system', 9895, 6, 'https://marketplacer.imgix.net/_z/9Y8iGv06IKibCvhOg2oeOd1jk.png?auto=format&fm=pjpg&fit=max&w=800&h=800&s=3be825e7d5f2415290cb63889895f0e2', false),
(1, 'Pet Tag Classic Paw', 'Pet Tags ensure the safety of your pets if they are to ever get lost!', 1795, 15, 'https://marketplacer.imgix.net/Wi/EWD4G-HysLTa1v1YqtUnY6XtQ.jpg?auto=format&fm=pjpg&fit=max&w=2048&h=2048&s=4cc346ec639c8df268629b1c79b1d531', false);

INSERT INTO sale (user_id, product_id, shipping_cost, country, street, city, province, postal)
VALUES (1, 1, 10, 'canada', 'main st','hamilton','on', '23eew2'),
(3, 1, 10, 'canada2', 'main st', 'hamilton', 'on', '347dgw'),
(1, 2, 10, 'canada3', 'main st2', 'hamilton', 'on', '347dgw'),
(7, 3, 10, 'canada4', 'main st3', 'hamilton', 'on', '347dgw'),
(3, 4, 10, 'canada5', 'main st4', 'hamilton', 'on', '347dgw'),
(6, 1, 10, 'canada6', 'main st5', 'hamilton', 'on', '347dgw'),
(2, 4, 10, 'canada7', 'main st6', 'hamilton', 'on', '347dgw'),
(5, 3, 10, 'canada8', 'main st7', 'hamilton', 'on', '347dgw');
