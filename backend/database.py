import sqlite3

conn = sqlite3.connect('../database/exam_system.db')
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS papers(
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    subject TEXT,
    title TEXT,

    exam_date TEXT,
    exam_time TEXT,

    copies INTEGER,

    question_text TEXT,

    filename TEXT,
    encrypted_file TEXT,

    otp TEXT,
    status TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)
""")


cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
)
""")

conn.commit()
conn.close()

print("Database Ready")