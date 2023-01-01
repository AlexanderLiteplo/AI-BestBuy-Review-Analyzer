CREATE TABLE Advertisement(
    id INT,
    brand VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE CartContainsProduct(
    cartID INT,
    username VARCHAR(255),
    productID INT,
    PRIMARY KEY (cartID , username) ,
    FOREIGN KEY (cartID, username) REFERENCES Cart,
    FOREIGN KEY (productID) REFERENCES Products
);
 
CREATE TABLE GlobalInventory(
    globalInventoryID INT,
    search VARCHAR(255),
    date DATETIME,
    PRIMARY KEY (globalInventoryID)
);
 
CREATE TABLE BestBuyReview(
    reviewID INT,
    Score FLOAT,
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
    globalInventoryID Integer NOT NULL,
    company VARCHAR(255),
    FOREIGN KEY (globalInventoryID) REFERENCES GlobalInventory (globalInventoryID)
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
    userName VARCHAR(255) PRIMARY KEY,
    loginID VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    globalInventoryID INTEGER,
    advertisementID INTEGER,
    postalCode VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    FOREIGN KEY (globalInventoryID) REFERENCES GlobalInventory (globalInventoryID),
    FOREIGN KEY (advertisementID) REFERENCES Advertisement (id)
);
