

SELECT P.name, P.price, AR.score, AI.score
                FROM Product P, User U, BestBuyReview AR, AIReview AI, Cart C, CartContainsProduct.CCP
                WHERE U.username = \'{username}\'
                AND C.username = U.username
                AND CCP.username = C.username
                AND CCP.cartID = C.cartID
                AND CCP.productID = P.productID
                AND P.productID = AR.productID
                AND P.productID = AI.productID