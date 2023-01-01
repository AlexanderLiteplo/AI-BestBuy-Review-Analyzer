INSERT INTO Advertisement VALUES (1, 'Apple');
INSERT INTO Advertisement VALUES (2, 'Samsung');
INSERT INTO Advertisement VALUES (3, 'Google');
INSERT INTO Advertisement VALUES (4, 'Microsoft');
INSERT INTO Advertisement VALUES (5, 'Amazon');
 
INSERT INTO Cart(cartID, username) VALUES (1, 'sickduck');
INSERT INTO Cart(cartID, username) VALUES (2, 'noobmaster68');
INSERT INTO Cart(cartID, username) VALUES (3, 'xanderminer');
INSERT INTO Cart(cartID, username) VALUES (4, 'tryhardallday');
INSERT INTO Cart(cartID, username) VALUES (5, 'shadowblade');
 

INSERT INTO Product(productID, price, name, globalInventoryID, company) VALUES (1, 420, "testproduct1", 1, "testcompany1");
INSERT INTO Product(productID, price, name, globalInventoryID, company) VALUES (2, 420, "testproduct2", 2, "testcompany2");
INSERT INTO Product(productID, price, name, globalInventoryID, company) VALUES (3, 420, "testproduct3", 3, "testcompany3");
INSERT INTO Product(productID, price, name, globalInventoryID, company) VALUES (4, 420, "testproduct4", 4, "testcompany4");
INSERT INTO Product(productID, price, name, globalInventoryID, company) VALUES (5, 420, "testproduct5", 5, "testcompany5");

INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(1, "shadowblade", 1);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(2, "sickduck", 2);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(3, "noobmaster68", 3);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(4, "xanderminer", 4);
INSERT INTO CartContainsProduct(cartID,  username,  productID ) VALUES(5, "tryhardallday", 5);
 
INSERT INTO GlobalInventory(globalInventoryID,  search,  date ) VALUES(1, "shoes", 2018-01-01);
INSERT INTO GlobalInventory(globalInventoryID,  search,  date ) VALUES(2, "gpus", 2018-01-01);
INSERT INTO GlobalInventory(globalInventoryID,  search,  date ) VALUES(3, "shirt", 2018-01-01);
INSERT INTO GlobalInventory(globalInventoryID,  search,  date ) VALUES(4, "chair", 2018-01-01);
INSERT INTO GlobalInventory(globalInventoryID,  search,  date ) VALUES(5, "fan", 2018-01-01);
 
INSERT INTO BestBuyReview(reviewID,  Score,  ReviewerName,  dateReviewed,  productID ) VALUES(1, 5, "shadowblade", 2018-01-01, 1);
INSERT INTO BestBuyReview(reviewID,  Score,  ReviewerName,  dateReviewed,  productID ) VALUES(2, 4, "sickduck", 2018-01-01, 2);
INSERT INTO BestBuyReview(reviewID,  Score,  ReviewerName,  dateReviewed,  productID ) VALUES(3, 3, "noobmaster68", 2018-01-01, 3);
INSERT INTO BestBuyReview(reviewID,  Score,  ReviewerName,  dateReviewed,  productID ) VALUES(4, 2, "xanderminer", 2018-01-01, 4);
INSERT INTO BestBuyReview(reviewID,  Score,  ReviewerName,  dateReviewed,  productID ) VALUES(5, 1, "tryhardallday", 2018-01-01, 5);
 
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(1, 2018-01-01, "testalgo", 5, 1);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(2, 2018-01-01, "testalgo", 4, 2);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(3, 2018-01-01, "testalgo", 3, 3);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(4, 2018-01-01, "testalgo", 2, 4);
INSERT INTO AIReview(reviewID,  dateGenerated,  algorithm,  score,  productID ) VALUES(5, 2018-01-01, "testalgo", 1, 5);
 
INSERT INTO UserInterface(enumCode, rgbValue, theme) VALUES(1, 123456, "darktheme");
INSERT INTO UserInterface(enumCode, rgbValue, theme) VALUES(2, 654321, "lighttheme");
INSERT INTO UserInterface(enumCode, rgbValue, theme) VALUES(3, 123654, "greentheme");
INSERT INTO UserInterface(enumCode, rgbValue, theme) VALUES(4, 456123, "redtheme");
INSERT INTO UserInterface(enumCode, rgbValue, theme) VALUES(5, 789456, "bluetheme");

 
INSERT INTO User(userName, loginID, password, globalInventoryID, advertisementID, postalCode, address, city, country) VALUES("shadowblade", "testloginID1", "69", 1, 1,"testPostalCode" ,"testaddress1", "Vancouver", "Canada");
INSERT INTO User(userName, loginID, password, globalInventoryID, advertisementID, postalCode, address, city, country) VALUES("sickduck", "testloginID2", "69", 2, 2,"testPostalCode" ,"testaddress2", "Vancouver", "Canada");
INSERT INTO User(userName, loginID, password, globalInventoryID, advertisementID, postalCode, address, city, country) VALUES("noobmaster68", "testloginID3", "69", 3, 3,"testPostalCode" ,"testaddress3","Vancouver", "Canada");
INSERT INTO User(userName, loginID, password, globalInventoryID, advertisementID, postalCode, address, city, country) VALUES("xanderminer", "testloginID4", "69", 4, 4,"testPostalCode" ,"testaddress4", "Vancouver", "Canada");
INSERT INTO User(userName, loginID, password, globalInventoryID, advertisementID, postalCode, address, city, country) VALUES("tryhardallday", "testloginID5", "69", 5, 5,"testPostalCode" ,"testaddress5", "Vancouver", "Canada");