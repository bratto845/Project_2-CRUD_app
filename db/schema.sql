CREATE DATABASE fetchmate_app;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_digest TEXT NOT NULL
);
CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    event_title TEXT NOT NULL,
    image_url TEXT,
    location TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    attendees TEXT
    );

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT,
    description TEXT
);
CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    content TEXT,
    user_id INTEGER,
    post_id INTEGER
);
CREATE TABLE snp(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    store_pic TEXT,
    services TEXT,
    location TEXT NOT NULL,
    rating INTEGER,
    user_id INTEGER
);

CREATE TABLE vets(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    store_pic TEXT,
    location TEXT NOT NULL,
    user_id INTEGER
);

INSERT INTO vets (name, store_pic, location, user_id)
VALUES ('Jet City Animal Clinic', 'https://jetcityanimalclinic.com/wp-content/uploads/2024/03/IMG_1325.jpg', '822 12th Ave, Seattle, WA 98122, United States', 2);

INSERT INTO snp (name, store_pic, services, location, rating, user_id)
VALUES ('MudBay', 'https://s3-media0.fl.yelpcdn.com/bphoto/tVmP-bGW1DJm_XT1mpIbSw/1000s.jpg','Pet supplies', '8532 1st Ave NW, Seattle, WA 98117, United States', 4, 1);

INSERT INTO snp (name, store_pic, services, location, rating, user_id)
VALUES ('Wag N` Wash', 'https://s3-media0.fl.yelpcdn.com/bphoto/vVoPzdYzrDGff-tab9wNwg/348s.jpg', 'Pet Grooming','1932 Queen Anne Ave N, Seattle, WA 98109, United States, United States', 5, 2);

INSERT INTO snp (name, store_pic, services, location, rating, user_id)
VALUES ('Dogwood Play Park ', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs5bLFTUFrgHmoQsy_W5d00Y5jLTOA5gpFrA&s', 'Dog Park','12568 33rd Ave NE, Seattle, WA 98125, United States, United States', 3, 2);



INSERT INTO posts (title, image_url, description, user_id) VALUES ('Jiji','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQyQevRZiuP9E9fqprdmtZHL5tyx2u2R3CVQ&s', 'Super friendly Shih tzu, loves cuddles and whip cream.', 1);

INSERT INTO posts (title, image_url, description, user_id) VALUES ('Bear','https://media-be.chewy.com/wp-content/uploads/2021/04/11150033/Border-Collie-1306159446-921x615.jpg', 'Shy but sweet border collie, loves mud and smelling butts.', 1);


INSERT INTO users (email, password_digest)
VALUES ('jon@onefam.co.jp', 'itsmybrother')

ALTER TABLE posts ADD COLUMN user_id INTEGER;
ALTER TABLE posts ADD COLUMN category TEXT;

UPDATE posts set category = 'puppies' where id = 1;
UPDATE posts set category = 'parks' where id = 2;


CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    event_title TEXT NOT NULL,
    image_url TEXT,
    location TEXT NOT NULL,
    description TEXT,
    category TEXT,
    );

INSERT INTO events (user_id, event_title, image_url, location, description, category) VALUES (1, 'Jijis Birthday Party', 'https://www.ifyougiveablondeakitchen.com/wp-content/uploads/2019/09/pumpkin-dog-cake-recipe-cover-image-09.2019-500x375.jpg', 'Washington state park', 'Join us for Jijis birthday party at the doggie park', 'socialize');

ALTER TABLE users ADD COLUMN profile_pic TEXT;
ALTER TABLE users ADD COLUMN pet_pic TEXT;
ALTER TABLE users ADD COLUMN category TEXT;
ALTER TABLE users ADD COLUMN user_name TEXT;

UPDATE users set category = 'breeding opportunities' where id = 1;
UPDATE users set category = 'socialize my dog' where id = 2;
UPDATE users set profile_pic = 'https://play-lh.googleusercontent.com/3Fsib84emmZzNBKV0baMOEtK3lIwqTvxaw_0m6dMWJbtf0d6yirIx6vgvbi6KiqI7qk=w526-h296-rw' where id = 1;
UPDATE users set profile_pic = 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' where id = 2;

UPDATE users set pet_pic = 'https://media-be.chewy.com/wp-content/uploads/2021/04/11150033/Border-Collie-1306159446-921x615.jpg' where id = 1;
UPDATE users set pet_pic = 'https://media.4-paws.org/1/e/d/6/1ed6da75afe37d82757142dc7c6633a532f53a7d/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.jpg' where id = 2;

UPDATE users set user_name = 'puppies' where id = 1;

SELECT posts.*, users.user_name, users.profile_pic 
FROM posts 
JOIN users ON posts.user_id = users.id;

SELECT * FROM posts FULL OUTER JOIN users 
ON user_id = users.id;

SELECT * FROM events FULL OUTER JOIN users 
ON user_id = users.id;

INSERT INTO events (user_id, event_title, image_url, location, description, category) VALUES (2, 'tiny ones', 'https://hips.hearstapps.com/hmg-prod/images/beautiful-yorkshire-terrier-playing-with-a-ball-on-royalty-free-image-1724685261.jpg?crop=1xw:0.84415xh;center,top', 'Washington state park', 'small dogs club', 'socialize');
INSERT INTO events (user_id, event_title, image_url, location, description, category) VALUES (1, 'Aussies', 'https://www.akc.org/wp-content/uploads/2018/05/Three-Australian-Shepherd-puppies-sitting-in-a-field.jpg', 'Washington state park', 'big boys play time', 'socialize');
INSERT INTO events (user_id, event_title, image_url, location, description, category) VALUES (2, 'jijis b day', 'https://www.ifyougiveablondeakitchen.com/wp-content/uploads/2019/09/pumpkin-dog-cake-recipe-cover-image-09.2019-500x375.jpg', 'Washington state park', 'Join us for Jijis birthday party at the doggie park', 'socialize');