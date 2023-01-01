import sqlite3



# display cart items 

def get_cart_items_by_username(username):
    connection = sqlite3.connect("ProjectScripts.db")
    
    crsr = connection.cursor()
    
    qry = f"""SELECT P.name, P.price, AR.score, AI.score
                FROM Product P, User U, AmazonReview AR, AIReview AI, Cart C, CartContainsProduct.CCP
                WHERE U.username = \'{username}\'
                AND C.username = U.username
                AND CCP.username = C.username
                AND CCP.cartID = C.cartID
                AND CCP.productID = P.productID
                AND P.productID = AR.productID
                AND P.productID = AI.productID
                """
    
    crsr.execute(qry)
    
    data = crsr.fetchall()
    
    connection.commit()
    
    connection.close()
    
    return data