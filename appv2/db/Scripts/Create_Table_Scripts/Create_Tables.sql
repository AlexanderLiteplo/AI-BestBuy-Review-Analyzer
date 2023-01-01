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
    date DATETIME,
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
