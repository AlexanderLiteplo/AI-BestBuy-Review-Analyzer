-- Group by having and aggregation
-- todo make the bottom having condition a variable ✅
-- Gets search info for searches with avg AI score >= user input
SELECT S.search, P.name, AVG(P.price), AVG(AI.score), AVG(AR.score), date
FROM User U 
	NATURAL JOIN Searches S 
	NATURAL JOIN Product P 
	LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
	LEFT JOIN AIReview AI ON P.productID = AI.productID
GROUP BY S.search
HAVING AI.score >= 3;

-- Regular Select for search page ✅
-- Gets all search info
SELECT U.username, U.country, S.search, P.name, P.price, AR.score, AI.score
FROM User U 
NATURAL JOIN Searches S 
NATURAL JOIN Product P 
LEFT JOIN BestBuyReview AR ON P.productID = AR.productID 
LEFT JOIN AIReview AI ON P.productID = AI.productID

-- Search where we only select a few columns
-- We will have checkbox above username column and we can do a query with or without it
-- the following is the query without it ✅
-- Search with no username
SELECT U.country, S.search, P.name, P.price, AR.score, AI.score
FROM User U 
NATURAL JOIN Searches S 
NATURAL JOIN Product P 
LEFT JOIN BestBuyReview AR 
	ON P.productID = AR.productID 
LEFT JOIN AIReview AI 
	ON P.productID = AI.productID

-- Aggregation with group by ✅
-- Find avg price and scores of different searches
SELECT S.search, P.name, AVG(P.price), AVG(AR.score), AVG(AI.score)
FROM Searches S 
NATURAL JOIN Product P 
LEFT JOIN BestBuyReview AR 
	ON P.productID = AR.productID 
LEFT JOIN AIReview AI 
	ON P.productID = AI.productID
GROUP BY S.search;


-- Find the AVG price and review scores of 
-- searches that have been made more than once
-- Nested aggregation with group by ✅
SELECT S.search, AVG(P.price), AVG(AR.score), AVG(AI.score)
FROM Searches S 
NATURAL JOIN Product P 
LEFT JOIN BestBuyReview AR 
	ON P.productID = AR.productID 
LEFT JOIN AIReview AI 
	ON P.productID = AI.productID
WHERE P.searchID IN (SELECT S1.searchID
					FROM Searches S1
					GROUP BY S1.search
					HAVING COUNT(*)> 1)
GROUP BY S.Search;

-- Division: searches that have been made in all countries
-- dont run the view multiple times just need to run once! ✅


-- drop view Division if it exists
DROP VIEW IF EXISTS Division;

-- create view Division with columns username, search and country
CREATE VIEW Division AS
SELECT U.username, S.search, U.country
FROM User U LEFT JOIN Searches S ON U.username = S.username;

SELECT DISTINCT D.Search
FROM Division D
WHERE NOT EXISTS (SELECT U1.country
                    FROM User U1
                    EXCEPT
                    SELECT D1.country
                    FROM Division D1
                    WHERE D1.search = D.search);


