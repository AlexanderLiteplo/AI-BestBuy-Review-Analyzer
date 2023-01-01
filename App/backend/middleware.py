from functools import wraps
from flask import request, make_response, jsonify

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        # ensure the jwt-token is passed with the headers
        print(request.cookies.get('authenticated'))
        if 'authenticated' in request.cookies:
            token = request.cookies.get('authenticated')
        if not token: # throw error if no token provided
            res = {
                "message": "A valid token is missing!",
                "status" : 401
                }
        try:
            if token != 'chocolate chip':
                raise ValueError('Wrong issuer.')
            else:
                res = {
                    "message": "Token is valid!",
                    "status" : 202
                }
        except ValueError:
            res = {
                "message": "A valid token is missing!",
                "status" : 401
                }
         # Return the user information attached to the token
        return f(res, *args, **kwargs)
    return decorator
            