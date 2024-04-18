-- Drops the existing 'junk' database if it exists and creates a new one.
DROP DATABASE IF EXISTS junk;
CREATE DATABASE junk;
USE junk;

-- Table for storing user information with appropriate timestamps for creation and updates.
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
);

-- Table for storing tweets. Each tweet is associated with a user via a foreign key.
-- Timestamps are managed automatically for each tweet created.
CREATE TABLE tweets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table for tracking likes and dislikes on tweets. Each user can react to a tweet once.
-- Includes a unique index to ensure a user can only like or dislike a particular tweet once.
CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tweet_id INT NOT NULL,
    user_id INT NOT NULL,
    is_like BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX user_tweet_unique (user_id, tweet_id),
    FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);