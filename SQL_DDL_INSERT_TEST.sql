DROP TABLE IF EXISTS AIReview;
DROP TABLE IF EXISTS BestBuyReview;
DROP TABLE IF EXISTS CartContainsProduct;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Searches;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Advertisement;
DROP TABLE IF EXISTS UserInterface;


CREATE TABLE Advertisement(
    advertisementID INTEGER,
    brand VARCHAR(255),
    PRIMARY KEY (advertisementID)
);

CREATE TABLE CartContainsProduct(
    cartID INT,
    username VARCHAR(255),
    productID INT,
    PRIMARY KEY (cartID , username, productID),
    FOREIGN KEY (cartID, username) REFERENCES Cart (cartID, userName),
    FOREIGN KEY (productID) REFERENCES Product (productID)
);
 
 CREATE TABLE Searches(
    searchID INTEGER  PRIMARY KEY AUTOINCREMENT,
    search VARCHAR(255),
    searchDate DATETIME,
    username,
    FOREIGN KEY (username) REFERENCES User
);
 
CREATE TABLE BestBuyReview(
    reviewID INT,
    score FLOAT,
    ReviewerName VARCHAR(255),
    dateReviewed DATETIME,
    productID INTEGER NOT NULL,
    FOREIGN KEY (productID) REFERENCES Product (productID)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);
 
 
CREATE TABLE Cart(
    cartID Integer,
    username VARCHAR(255),
    PRIMARY KEY (cartID, username),
    FOREIGN KEY (username) REFERENCES User (username)
    ON DELETE CASCADE
);
 
CREATE TABLE Product(
    productID Integer PRIMARY KEY,
    price FLOAT,
    name VARCHAR(255),
    searchID Integer NOT NULL,
    company VARCHAR(255),
    FOREIGN KEY (searchID) REFERENCES Searches (searchID)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);
 
 
CREATE TABLE AIReview(
    reviewID Integer PRIMARY KEY,
    dateGenerated DATETIME,
    algorithm VARCHAR(255),
    score FLOAT,
    productID DECIMAL NOT NULL,
    FOREIGN KEY (productID) REFERENCES Product (productID)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);
 

CREATE TABLE UserInterface(
    enumCode INTEGER PRIMARY KEY,
    rgbValue INTEGER NOT NULL,
    theme VARCHAR(255) NOT NULL
);


 
CREATE TABLE User(
    username VARCHAR(255) PRIMARY KEY,
    logInId VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    advertisementID INTEGER,
    postalCode VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    FOREIGN KEY (advertisementID) REFERENCES Advertisement (advertisementID)
);

INSERT INTO Advertisement VALUES (1, 'Apple');
INSERT INTO Advertisement VALUES (2, 'Samsung');
INSERT INTO Advertisement VALUES (3, 'Google');
INSERT INTO Advertisement VALUES (4, 'Microsoft');
INSERT INTO Advertisement VALUES (5, 'Amazon');

INSERT INTO User(userName, loginID, password, advertisementID, address, postalCode, city, country) VALUES("shadowblade", "testloginID1", "password1", 1,  "551 swag st", "v6g 565", "Vancouver", "Canada");
INSERT INTO User(userName, loginID, password, advertisementID, address, postalCode, city, country) VALUES("sickduck", "testloginID2", "password2", 2,  "223 money team way", "v6g 865", "Vancouver", "Canada");
INSERT INTO User(userName, loginID, password, advertisementID, address, postalCode, city, country) VALUES("noobmaster68", "testloginID3", "password3", 3,  "1738 way", "v9g 565", "Vancouver", "Canada");
INSERT INTO User(userName, loginID, password, advertisementID, address, postalCode, city, country) VALUES("xanderminer", "testloginID4", "password4", 4,  "guap road", "v6g 165", "Vancouver", "Canada");
INSERT INTO User(userName, loginID, password, advertisementID, address, postalCode, city, country) VALUES("tryhardallday", "testloginID5", "password5", 5,  "1551 yolo ave", "v6g 565", "Vancouver", "Canada");
-- more users

INSERT INTO User(userName, loginID, password, advertisementID, address, postalCode, city, country) VALUES("saucemaster", "testloginID6", "password6", 1, "54 james st", "xx9 221", "Brooklyn", "United States");
INSERT INTO User(userName, loginID, password, advertisementID, address, postalCode, city, country) VALUES("crazy8", "testloginID7", "password7", 2,  "123 dab place", "xx9 201", "Paris", "France");
INSERT INTO User(userName, loginID, password, advertisementID, address, postalCode, city, country) VALUES("doobtoob", "testloginID8", "password8", 3,  "palace road", "1x9 221", "Mexico City", "Mexico");
INSERT INTO User(userName, loginID, password, advertisementID, address, postalCode, city, country) VALUES("alohahola", "testloginID9", "password9", 4, "high five st", "xx9 211", "Mogadishu", "Somalia");
INSERT INTO User(userName, loginID, password, advertisementID, address, postalCode, city, country) VALUES("6ix9ine", "testloginID10", "password10", 5, "meme team road", "xxx 221", "Cairo", "Egypt");

INSERT INTO Searches(searchID,  search,  searchDate, username) VALUES(1, "mouse pad", 2018-01-01, "xanderminer");
INSERT INTO Searches(searchID,  search,  searchDate, username) VALUES(2, "gaming mouse", 2018-01-01, "xanderminer");
INSERT INTO Searches(searchID,  search,  searchDate, username) VALUES(3, "playstation", 2018-01-01, "xanderminer");
INSERT INTO Searches(searchID,  search,  searchDate, username) VALUES(4, "cpu", 2018-01-01, "xanderminer");
INSERT INTO Searches(searchID,  search,  searchDate, username) VALUES(5, "gpus", 2018-01-01, "xanderminer");
INSERT INTO Searches(searchID,  search,  searchDate, username) VALUES(21, "gpus", 2018-01-01, "6ix9ine");
INSERT INTO Searches(searchID,  search,  searchDate, username) VALUES(22, "gpus", 2018-01-01, "saucemaster");
INSERT INTO Searches(searchID,  search,  searchDate, username) VALUES(23, "gpus", 2018-01-01, "crazy8");
INSERT INTO Searches(searchID,  search,  searchDate, username) VALUES(24, "gpus", 2018-01-01, "doobtoob");
INSERT INTO Searches(searchID,  search,  searchDate, username) VALUES(25, "gpus", 2018-01-01, "alohahola");



INSERT INTO Product(productID, price, name, searchID, company) VALUES (1, 19.99, "mouse pad", 1, "Corsair");
INSERT INTO Product(productID, price, name, searchID, company) VALUES (2, 25.19, "gaming mouse", 2, "Logitech");
INSERT INTO Product(productID, price, name, searchID, company) VALUES (3, 599.99, "Playstation 5", 3, "Sony");
INSERT INTO Product(productID, price, name, searchID, company) VALUES (4, 499.99, "Ryzen 7 CPU", 4, "AMD");
INSERT INTO Product(productID, price, name, searchID, company) VALUES (5, 1500.99, "rtx 3090ti", 5, "Nvidia");
INSERT INTO Product(productID, price, name, searchID, company) VALUES (6, 300, "gpu1", 21, "comp1");
INSERT INTO Product(productID, price, name, searchID, company) VALUES (7, 800, "gpu2", 21, "Nvidia");
INSERT INTO Product(productID, price, name, searchID, company) VALUES (8, 69.99, "gpu3", 21, "comp2");
INSERT INTO Product(productID, price, name, searchID, company) VALUES (9, 250, "gtx 1080ti", 21, "Nvidia");
INSERT INTO Product(productID, price, name, searchID, company) VALUES (10, 100000, "gpu4", 21, "comp2");


INSERT INTO Cart(cartID, username) VALUES (1, 'sickduck');
INSERT INTO Cart(cartID, username) VALUES (2, 'noobmaster68');
INSERT INTO Cart(cartID, username) VALUES (3, 'xanderminer');
INSERT INTO Cart(cartID, username) VALUES (4, 'tryhardallday');
INSERT INTO Cart(cartID, username) VALUES (5, 'shadowblade');
INSERT INTO Cart(cartID, username) VALUES (6, 'saucemaster');
INSERT INTO Cart(cartID, username) VALUES (7, 'crazy8');
INSERT INTO Cart(cartID, username) VALUES (8, 'doobtoob');
INSERT INTO Cart(cartID, username) VALUES (9, 'alohahola');
INSERT INTO Cart(cartID, username) VALUES (10, '6ix9ine');

INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(1, 'sickduck', 1);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(2, 'noobmaster68', 2);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(3, 'xanderminer', 3);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(4, 'tryhardallday', 4);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(5, 'shadowblade', 5);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(5, 'shadowblade', 1);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(6, 'saucemaster', 10);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(7, 'crazy8', 9);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(8, 'doobtoob', 6);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(8, 'doobtoob', 10);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(8, 'doobtoob', 7);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(9, 'alohahola', 9);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(10, '6ix9ine', 10);


INSERT INTO BestBuyReview(reviewID,  score,  ReviewerName,  dateReviewed,  productID ) VALUES(1, 5, "shadowblade", 2018-01-01, 1);
INSERT INTO BestBuyReview(reviewID,  score,  ReviewerName,  dateReviewed,  productID ) VALUES(2, 4, "sickduck", 2018-01-01, 2);
INSERT INTO BestBuyReview(reviewID,  score,  ReviewerName,  dateReviewed,  productID ) VALUES(3, 3, "noobmaster68", 2018-01-01, 3);
INSERT INTO BestBuyReview(reviewID,  score,  ReviewerName,  dateReviewed,  productID ) VALUES(4, 2, "xanderminer", 2018-01-01, 4);
INSERT INTO BestBuyReview(reviewID,  score,  ReviewerName,  dateReviewed,  productID ) VALUES(5, 1, "tryhardallday", 2018-01-01, 5);
INSERT INTO BestBuyReview(reviewID,  score,  ReviewerName,  dateReviewed,  productID ) VALUES(6, 4, "sadjoe", 2018-01-01, 6);
INSERT INTO BestBuyReview(reviewID,  score,  ReviewerName,  dateReviewed,  productID ) VALUES(7, 2.2, "bruskiiii", 2018-01-01, 7);
INSERT INTO BestBuyReview(reviewID,  score,  ReviewerName,  dateReviewed,  productID ) VALUES(8, .3, "pooptobe", 2018-01-01, 8);
INSERT INTO BestBuyReview(reviewID,  score,  ReviewerName,  dateReviewed,  productID ) VALUES(9, 3.3, "gahdamn", 2018-01-01, 9);
INSERT INTO BestBuyReview(reviewID,  score,  ReviewerName,  dateReviewed,  productID ) VALUES(10, 2.4, "gahdamn", 2018-01-01, 10);

INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(1, 2018-01-01, "testalgo", 5, 1);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(2, 2018-01-01, "testalgo", 4, 2);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(3, 2018-01-01, "testalgo", 3, 3);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(4, 2018-01-01, "testalgo", 2, 4);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(5, 2018-01-01, "testalgo", 1, 5);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(6, 2018-01-01, "testalgo", 5.0, 6);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(7, 2018-01-01, "testalgo", 4.9, 7);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(8, 2018-01-01, "testalgo", 3.1, 8);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(9, 2018-01-01, "testalgo", 4.1, 9);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(10, 2018-01-01, "testalgo", 3.6, 10);

INSERT INTO UserInterface(enumCode, rgbValue, theme) VALUES(1, 123456, "darktheme");
INSERT INTO UserInterface(enumCode, rgbValue, theme) VALUES(2, 654321, "lighttheme");
INSERT INTO UserInterface(enumCode, rgbValue, theme) VALUES(3, 123654, "greentheme");
INSERT INTO UserInterface(enumCode, rgbValue, theme) VALUES(4, 456123, "redtheme");
INSERT INTO UserInterface(enumCode, rgbValue, theme) VALUES(5, 789456, "bluetheme");

