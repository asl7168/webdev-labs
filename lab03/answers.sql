-- Exercise 1 (done for you):
SELECT * FROM users;



-- Exercise 2 (done for you):
SELECT id, first_name, last_name 
FROM users;



-- Exercise 3
SELECT id, first_name, last_name
FROM users
ORDER BY last_name;



-- Exercise 4
SELECT id, image_url, user_id
FROM posts
WHERE user_id = 26;



-- Exercise 5
SELECT id, image_url, user_id
FROM posts
WHERE user_id = 12 OR user_id = 26;



-- Exercise 6
SELECT COUNT(*)
FROM posts;



-- Exercise 7
SELECT user_id, COUNT(*)
FROM comments
GROUP BY user_id
ORDER BY COUNT(*) DESC;



-- Exercise 8
SELECT p.id, p.image_url, p.user_id, u.username, u.first_name, u.last_name
FROM posts AS p
JOIN users AS u ON p.user_id = u.id
WHERE p.user_id = 12 OR p.user_id = 26;



-- Exercise 9
SELECT p.id, p.pub_date, f.following_id
FROM posts AS p
JOIN following AS f ON p.user_id = f.following_id
WHERE f.user_id = 26;



-- Exercise 10
SELECT p.id, p.pub_date, f.following_id, u.username
FROM posts AS p
JOIN following AS f ON p.user_id = f.following_id
JOIN users AS u ON f.following_id = u.id
WHERE f.user_id = 26
ORDER BY p.pub_date DESC;



-- Exercise 11
INSERT INTO bookmarks (user_id, post_id, timestamp)
SELECT 26, id, now()
FROM posts
WHERE id = 219;

INSERT INTO bookmarks (user_id, post_id, timestamp)
SELECT 26, id, now()
FROM posts
WHERE id = 220;

INSERT INTO bookmarks (user_id, post_id, timestamp)
SELECT 26, id, now()
FROM posts
WHERE id = 221;

/* I think this can be combined into:
INSERT INTO bookmarks (user_id, post_id, timestamp)
SELECT 26, id, now()
FROM posts
WHERE id = 219 OR id = 220 OR id = 221;
*/



-- Exercise 12
DELETE FROM bookmarks 
WHERE user_id = 26 AND post_id = 219;

DELETE FROM bookmarks 
WHERE user_id = 26 AND post_id = 220;

DELETE FROM bookmarks 
WHERE user_id = 26 AND post_id = 221;

/* I think this can be combined into:
DELETE FROM bookmarks 
WHERE user_id = 26 AND (post_id = 219 OR post_id = 220 OR post_id = 221);
*/



-- Exercise 13
UPDATE users 
SET email = 'knick2022@gmail.com'
WHERE id = 26;



-- Exercise 14
SELECT p.id, p.user_id, COUNT(comments.post_id), CONCAT(SUBSTRING(p.caption, 0, 50), '...')
FROM posts AS p
JOIN comments ON p.id = comments.post_id 
WHERE p.user_id = 26 AND p.id = comments.post_id
GROUP BY p.id
ORDER BY COUNT(comments.post_id) DESC;
