from email.policy import default
from yt_dlp import YoutubeDL
import json
import pandas as pd
from csv import DictWriter
import pymongo
from flask import Flask,jsonify, make_response
from flask import request,Response
import os
import glob
from flask_cors import CORS 
from middleware import token_required
from jwt import encode, decode, exceptions
from datetime import datetime, timedelta


SECRET_KEY = 'this_is_my_secret_key'



#setup flask server and database
app = Flask(__name__)
CORS(app, supports_credentials=True)
# myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# mydb = myclient["song_db"]
# mycol = mydb["Songs_list"]

app.config['SECRET_KEY'] = SECRET_KEY

@app.route('/song', methods = ['GET', 'POST', 'DELETE'])
# @token_required
def song():
    if request.method == 'GET':
        return get_all_songs()
    
    if request.method == 'POST':
        # print(request.data)
        # print(request.args)
        body=json.loads(request.data.decode())
        # print(type(body))
        song_to_add = body['query']
        print(song_to_add)
        downloader(song_to_add)
        return get_all_songs()

    if request.method == 'DELETE':
        body=json.loads(request.data.decode())
        song_to_delete = body['id']
        song_local=glob.glob(song_to_delete+'*')
        print(song_local)
        song_local='' if song_local==[] else song_local[0]
        if os.path.exists(song_local):
            os.remove(song_local)
        else:
            print("Can not delete the file as it doesn't exists")
        x=mycol.delete_one({"id": song_to_delete})
        print(x)
        if x:
            print(song_to_delete+' has been deleted')
        return get_all_songs()

# CREATE A JSON DATA
OBJ = [{
    "id": "1",
    "title": "song1",
    "artist": "artist1",
    "album": "album1",
    "duration": "1:00",
    "url": "url1",
    "image": "image1",
    "local": "local1"

},{
    "id": "1",
    "title": "song1",
    "artist": "artist1",
    "album": "album1",
    "duration": "1:00",
    "url": "url1",
    "image": "image1",
    "local": "local1"

},{
    "id": "1",
    "title": "song1",
    "artist": "artist1",
    "album": "album1",
    "duration": "1:00",
    "url": "url1",
    "image": "image1",
    "local": "local1"

}, ]

@app.route('/login', methods = ['POST'])
def login():
    # res.status_code = 202
    # res.set_cookie("authenticated", "chocolate chip", httponly=True, secure=True, samesite='Strict', max_age=3600)
    # return res

    #generate refresh and access token





    body=json.loads(request.data.decode())
    print(body)
    print(app.config['SECRET_KEY'])
    refresh_token = encode({'user': body['username'], 'role': ['admin'] , 'exp': datetime.utcnow() + timedelta(days=1)},app.config['SECRET_KEY'], algorithm= 'HS256')
    access_token = encode({'user': body['username'] , 'role': ['admin'] ,'exp': datetime.utcnow() + timedelta(minutes=10)}, app.config['SECRET_KEY'],algorithm= 'HS256')
    res = make_response(jsonify({'user': body['username'], 'role': ['admin'],'access_token': access_token}))
    try:
        if body['username'] != body['password']:
            raise ValueError('Wrong issuer.')
        res.set_cookie("refresh_token", refresh_token, httponly=True,path="/" ,secure=True, samesite='Strict', max_age=3600)
        res.status_code = 202
        print(res.headers)
        return res
    except ValueError:
        res.status_code = 401
        print(res)
        return res

@app.route('/refresh', methods = ['GET'])
def refresh():
    refresh_token = request.cookies.get('refresh_token')
    print("refresh token : " + refresh_token)
    data = decode(refresh_token, app.config['SECRET_KEY'], algorithms= 'HS256')
    # print(data)
    try:
        access_token = encode({'user': data['user'] , 'role': data['role'] ,'exp': datetime.utcnow() + timedelta(minutes=10)}, app.config['SECRET_KEY'])
        res = make_response(jsonify({'user': data['user'], 'role': data['role'],'access_token': access_token}))
        res.status_code = 202
        return res
    except exceptions.ExpiredSignatureError:
        print("Signature expired. Please log in again.")
        res = make_response(jsonify({'error': 'Refresh token expired'}))
        res.status_code = 401
        return res
    except exceptions.InvalidTokenError:
        print("Invalid token. Please log in again.")
        res = make_response(jsonify({'error': 'Invalid refresh token'}))
        res.status_code = 401
        return res

@app.route('/verify', methods = ['GET'])
@token_required
def login_check(res):
    print(res)
    
    returnval = make_response(res["message"])
    returnval.status_code = res["status"]
    return returnval

@app.route('/logout', methods = ['GET'])
@token_required
def logout(res):
    if(res["status"] == 202):
        retval = make_response("Logged out Successfully", 202)
        retval.set_cookie("authenticated", "", httponly=True,path="/" ,secure=True, samesite='Strict', max_age=0)
        return retval
    else:
        return make_response("Not logged in", 401)

if __name__ == '__main__':
      app.run(host='0.0.0.0', port=8000)
      



