from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import os

KEY = b'1234567890123456'

def encrypt_file(input_file, output_file):

    cipher = AES.new(KEY, AES.MODE_EAX)

    with open(input_file, "rb") as f:
        data = f.read()

    ciphertext, tag = cipher.encrypt_and_digest(data)

    with open(output_file, "wb") as f:
        f.write(cipher.nonce)
        f.write(tag)
        f.write(ciphertext)

    return output_file


import sqlite3

conn = sqlite3.connect("../database/exam_system.db")

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
)
""")

conn.commit()
conn.close()

print("Users table created successfully")