import csv, sqlite3
from sqlite3.dbapi2 import Error


def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

create_connection(r"C:\Users\sjtee\OneDrive\BCIT\Term1mini\project_database\anime_watchlist.db")

con = sqlite3.connect(r'anime_watchlist.db') # change to 'sqlite:///your_filename.db'
cur = con.cursor()
#cur.execute("CREATE TABLE ANI_List (ANI_List_ID,ANI_ID);") # use your column names here

"""
with open('Anime.csv','r',encoding="utf-8",errors='ignore') as fin: # `with` statement available in 2.5+
    # csv.DictReader uses first line in file for column headings by default
    dr = csv.DictReader(fin) # comma is default delimiter
    to_db = [(i['ANI_ID'],i['ANI_title'],i['ANI_desc'],i['ANI_pic']) for i in dr]

cur.executemany("INSERT INTO anime (ANI_ID, ANI_title,ANI_desc,ANI_pic) VALUES (?,?,?,?);", to_db)
con.commit()
con.close()
"""

"""
with open('Users.csv','r',encoding="utf-8",errors='ignore') as fin: # `with` statement available in 2.5+
    # csv.DictReader uses first line in file for column headings by default
    dr = csv.DictReader(fin) # comma is default delimiter
    to_db = [(i['USR_ID'],i['USR_name'],i['USR_username'],i['USR_passwords'],i['USR_GMAIL']) for i in dr]

cur.executemany("INSERT INTO users (USR_ID, USR_name,USR_username,USR_passwords,USR_GMAIL) VALUES (?,?,?,?,?);", to_db)
con.commit()
con.close()
"""

with open('Anime_List.csv','r',encoding="utf-8",errors='ignore') as fin: # `with` statement available in 2.5+
    # csv.DictReader uses first line in file for column headings by default
    dr = csv.DictReader(fin) # comma is default delimiter
    to_db = [(i['USR_ID'],i['ANI_ID']) for i in dr]

cur.executemany("INSERT INTO Anime_List (USR_ID, ANI_ID) VALUES (?,?);", to_db)
con.commit()
con.close()