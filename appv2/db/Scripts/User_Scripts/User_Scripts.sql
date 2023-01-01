UPDATE User 
                SET password = 'password', 
                    postalCode = 'postalcode',
                    address = 'address',
                    city = 'city',
                    country = 'country'
                WHERE username = 'username';

DELETE FROM User WHERE username = 'username';

SELECT * FROM User WHERE username = 'username';

INSERT INTO User(userName,
                loginID,
                password,
                advertisementID,
                postalCode,
                address,
                city,
                country) 
            VALUES('username',
                    'logInId',
                    'password',
                    advertisementID,
                    'postalCode',
                    'address',
                    'city',
                    'country');

INSERT INTO Cart(cartID, username)
                VALUES(cartNumber, 'username');