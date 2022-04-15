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
SELECT posts.id, posts.image_url, posts.user_id, users.username, users.first_name, users.last_name
FROM posts 
JOIN users ON posts.user_id = users.id
WHERE posts.user_id = 12 OR posts.user_id = 26;



-- Exercise 9
SELECT p.id, p.pub_date, f.following_id
FROM posts AS p
JOIN following AS f ON p.user_id=f.following_id
WHERE f.user_id=26;



-- Exercise 10
SELECT p.id, p.pub_date, f.following_id, u.username
FROM posts AS p
JOIN following AS f ON p.user_id=f.following_id
JOIN users AS u ON f.following_id=u.id
WHERE f.user_id=26
ORDER BY p.pub_date DESC;



-- Exercise 11




-- Exercise 12




-- Exercise 13




-- Exercise 14
