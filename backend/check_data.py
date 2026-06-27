import sqlite3

conn = sqlite3.connect('../database/exam_system.db')

cursor = conn.cursor()

cursor.execute("SELECT * FROM papers")

rows = cursor.fetchall()

for row in rows:
    print(row)

conn.close()