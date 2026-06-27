import sqlite3

conn = sqlite3.connect("../database/exam_system.db")
cursor = conn.cursor()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")

tables = cursor.fetchall()

print("Tables:")
for table in tables:
    print(table[0])

conn.close()