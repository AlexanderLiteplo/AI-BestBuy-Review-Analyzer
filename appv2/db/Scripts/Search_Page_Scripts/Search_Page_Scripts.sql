-- good
-- Regular search by searchID
SELECT P.productID, P.name, P.price, B.score as bestBuyReviewScore, A.score as aiReviewScore
                FROM Product P  
                LEFT JOIN BestBuyReview B 
                        ON P.productID = B.productID 
                LEFT JOIN AIReview A 
                        ON P.productID = A.productID 
                        AND B.productID = A.productID
                WHERE P.searchID = 21;

-- Get top ten AI reviewed product from search by searchID
SELECT P.productID, P.name, P.price, B.score as bestBuyReviewScore, A.score as aiReviewScore
                FROM Product P  
                LEFT JOIN BestBuyReview B 
                        ON P.productID = B.productID 
                LEFT JOIN AIReview A 
                        ON P.productID = A.productID 
                        AND B.productID = A.productID
                WHERE P.searchID = 21
                ORDER BY A.score DESC
                LIMIT 10;
--good done
-- Regular search by searchID orderby AI review	DESC
-- should be used based on user input	
SELECT P.productID, P.name, P.price, B.score as bestBuyReviewScore, A.score as aiReviewScore
                FROM Product P  
                LEFT JOIN BestBuyReview B 
                        ON P.productID = B.productID 
                LEFT JOIN AIReview A 
                        ON P.productID = A.productID 
                        AND B.productID = A.productID
                WHERE P.searchID = 21
                ORDER BY A.score DESC;

-- Search by max price
-- should be changed to take user input
SELECT P.productID, P.name, P.price, B.score as bestBuyReviewScore, A.score as aiReviewScore
                FROM Product P  
                LEFT JOIN BestBuyReview B 
                        ON P.productID = B.productID 
                LEFT JOIN AIReview A 
                        ON P.productID = A.productID 
                        AND B.productID = A.productID
WHERE P.price <= 300;
-- serach by max price ordered by AI score descending
-- should be ordered based 
SELECT P.productID, P.name, P.price, B.score as bestBuyReviewScore, A.score as aiReviewScore
                FROM Product P  
                LEFT JOIN BestBuyReview B 
                        ON P.productID = B.productID 
                LEFT JOIN AIReview A 
                        ON P.productID = A.productID 
                        AND B.productID = A.productID
                WHERE P.searchID = 21
                AND P.price <= 300
                ORDER BY A.score DESC;
-- good done
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
                69,
                'postalCode',
                'address',
                'city',
                'country');