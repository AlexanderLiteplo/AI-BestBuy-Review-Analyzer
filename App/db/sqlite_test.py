import sqlite3

# get data from database
# sqlite = sqlite3()

def execute():
    qry = open('Scripts/Create_Table_Scripts/Create_Tables.sql', 'r').read()
    conn = sqlite3.connect('ProjectScripts.db')
    c = conn.cursor()
    c.execute(qry)
    conn.commit()
    c.close()
    conn.close()
    return

def retrieve():
    conn = sqlite3.connect('ProjectScripts.db')
    c = conn.cursor()
    c.execute("SELECT * FROM CartContainsProduct")
    songs = c.fetchall()
    for song in songs:
        print(song)
    c.close()
    conn.close()
    return songs

def seed():
    qry = open('Scripts/Seed_Scripts/Seed_Tables.sql', 'r').read()
    for q in qry.split(';'):
        conn = sqlite3.connect('ProjectScripts.db')
        c = conn.cursor()
        c.execute(q)
        conn.commit()
        c.close()
        conn.close()
    return







# delete_user()
# execute()
# seed()
# data = retrieve()
# print(data)
