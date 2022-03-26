DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

CREATE TABLE `Users` (
	`userid` int NOT NULL AUTO_INCREMENT,
	`username` varchar(10) UNIQUE,
	`wishlist` varchar(255) NOT NULL,
	PRIMARY KEY (`userid`)
);

CREATE TABLE `Books` (
	`bookid` int NOT NULL AUTO_INCREMENT,
	`addedby` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`authors` varchar(255) NOT NULL,
	`imgurl` varchar(255),
	`isbn` varchar(20),
	`genre` varchar(255),
	`summary` varchar(255),
	`bookcondition` varchar(255),
	PRIMARY KEY (`bookid`)
);

CREATE TABLE `Messages` (
	`messageid` int NOT NULL AUTO_INCREMENT,
	`messagesubject` varchar(255) NOT NULL,
	`body` varchar(1000) NOT NULL,
	`sender` int(255) NOT NULL,
	`recipient` int(255) NOT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`messageid`)
);

INSERT INTO Users (username, wishlist) VALUES
("User1", "I want 50 books"),
("User2", "Looking for non-fiction books.");

-- ALTER TABLE `Books` ADD CONSTRAINT `Books_fk0` FOREIGN KEY (`addedby`) REFERENCES `Users`(`userid`);

ALTER TABLE `Messages` ADD CONSTRAINT `Messages_fk0` FOREIGN KEY (`sender`) REFERENCES `Users`(`userid`);

ALTER TABLE `Messages` ADD CONSTRAINT `Messages_fk1` FOREIGN KEY (`recipient`) REFERENCES `Users`(`userid`);

INSERT INTO Books (addedby, title, authors, imgurl, isbn, genre, summary, bookcondition) VALUES 
(1, "Red-Handed", "Peter Schweizer", "https://storage.googleapis.com/du-prd/books/images/9780063061149.jpg", "1234", "Politics", "The author of “Profiles in Corruption” portrays a conspiracy of how the Chinese government might infiltrate American institutions.", "Excellent used condition"),
(1, "The Nineties", "Chuck Klosterman", "https://storage.googleapis.com/du-prd/books/images/9780735217959.jpg", "1234", "History", "An overview of the cultural and historical impact of the 1990s.", "Brand new"),
(1, "The Body Keeps the Score", "Bessel Ven der Kolk", "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1594559067l/18693771._SY475_.jpg", "1234", "Mental Health", "How trauma affects the body and mind, and innovative treatments for recovery.", "Some wear and tear"),
(1, "The 1619 Project", "Nikole Hannah-Jones, Caitlin Roper, Ilena Silverman and Jake Silverstein (Eds)", "https://storage.googleapis.com/du-prd/books/images/9780593230572.jpg", "1234", "History", "Viewing Americas entanglement with slavery and its legacy, in essays adapted and expanded from The New York Times Magazine.", "Some wear and tear"),
(1, "Educated", "Tara Westover", "https://storage.googleapis.com/du-prd/books/images/9780399590504.jpg", "1234", "Memoir", "The daughter of survivalists, who is kept out of school, educates herself enough to leave home for university.", "Brand new"),
(2, "Abandoned in Death", "JD Robb", "https://storage.googleapis.com/du-prd/books/images/9781250278210.jpg", "1234", "Thriller", "The 54th book of the In Death series. Eve Dallas investigates a homicide and the disappearance of other women who resemble that victim.", "Excellent used condition"),
(2, "It Ends With Us", "Colleen Hoover", "https://storage.googleapis.com/du-prd/books/images/9781501110375.jpg", "1234", "Romance", "A battered wife raised in a violent home attempts to halt the cycle of abuse.", "Brand new"),
(2, "City of the Dead", "Jonathan Kellerman", "https://storage.googleapis.com/du-prd/books/images/9780525618584.jpg", "1234", "Thriller", "The 37th book in the Alex Delaware series. Delaware and Sturgis investigate a double homicide.", "Excellent used condition"),
(2, "Verity", "Colleen Hoover", "https://storage.googleapis.com/du-prd/books/images/9781791392796.jpg", "1234", "Thriller", "Lowen Ashleigh is hired by the husband of an injured writer to complete her popular series and uncovers a horrifying truth.", "Brand new"),
(2, "The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid", "https://storage.googleapis.com/du-prd/books/images/9781501161933.jpg", "1234", "Historical Fiction", "A movie icon recounts stories of her loves and career to a struggling magazine writer.", "Excellent used condition");

INSERT INTO Messages (messagesubject, body, sender, recipient) VALUES
("Subject 1", "This is email body 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", 1, 2),
("Subject 2", "This is email body 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", 1, 2),
("Subject 3", "This is email body 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", 2, 1),
("Subject 4", "This is email body 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", 2, 1);

