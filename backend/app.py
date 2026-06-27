from ai_paraphrase import paraphrase_text
from flask import Flask, jsonify, request
from flask_cors import CORS
from encryption import encrypt_file
from flask import send_file
import sqlite3
import os
import random

print("PRIYA APP FILE LOADED")

app = Flask(__name__)
CORS(app)

def add_log(action):

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO logs(action) VALUES(?)",
        (action,)
    )

    conn.commit()
    conn.close()

UPLOAD_FOLDER = "../uploads/original"
ENCRYPT_FOLDER = "../uploads/encrypted"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(ENCRYPT_FOLDER, exist_ok=True)


@app.route('/upload', methods=['POST'])
def upload_paper():

    print("UPLOAD API CALLED")

    subject = request.form['subject']
    title = request.form['title']

    exam_date = request.form['exam_date']
    exam_time = request.form['exam_time']
    copies = request.form['copies']
    question_text = request.form['question_text']

    file = request.files['paper']

    original_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(original_path)

    encrypted_name = "enc_" + file.filename

    encrypted_path = os.path.join(
        ENCRYPT_FOLDER,
        encrypted_name
    )

    print("Original File:", original_path)
    print("Encrypted File:", encrypted_path)

    conn = sqlite3.connect(
        '../database/exam_system.db'
    )

    cursor = conn.cursor()

    print("SUBJECT =", subject)
    print("TITLE =", title)
    print("DATE =", exam_date)
    print("TIME =", exam_time)
    print("COPIES =", copies)

    cursor.execute("""
        INSERT INTO papers
        (
        subject,
        title,
        exam_date,
        exam_time,
        copies,
        question_text,
        filename,
        encrypted_file,
        status
        )
        VALUES(?,?,?,?,?,?,?,?,?)
        """,
        (
        subject,
        title,
        exam_date,
        exam_time,
        copies,
        question_text,
        file.filename,
        encrypted_name,
        "Pending"
        ))

    print("INSERT SUCCESS")

    conn.commit()
    print("COMMIT SUCCESS")
    conn.close()

    add_log("Paper Uploaded")

    return {
        "message":"Paper Uploaded and Encrypted"
    }

@app.route('/generate-otp/<int:paper_id>')
def generate_otp(paper_id):

    conn = sqlite3.connect(
        '../database/exam_system.db'
    )

    cursor = conn.cursor()

    cursor.execute(
    """
    SELECT status
    FROM papers
    WHERE id=?
    """,
    (paper_id,)
    )

    paper = cursor.fetchone()

    if not paper:
        return {
            "error":"Paper Not Found"
        }

    if paper[0] != "Approved":
        return {
            "error":"Only Approved Papers Can Generate OTP"
        }

    otp = random.randint(100000, 999999)


    cursor.execute(
        """
        UPDATE papers
        SET otp=?
        WHERE id=?
        """,
        (str(otp), paper_id)
    )

    conn.commit()
    conn.close()

    add_log("OTP Generated")

    return {
        "otp": otp
    }

@app.route('/verify-otp', methods=['POST'])
def verify_otp():

    data = request.json
    otp = data['otp']

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM papers WHERE otp=?",
        (otp,)
    )

    paper = cursor.fetchone()
    conn.close()

    if paper:
        add_log("Secure Viewer Access Granted")
        return {"success": True}

    return {"success": False}



@app.route('/check')
def check():

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM papers")

    data = cursor.fetchall()

    conn.close()

    return {"data": str(data)}

@app.route('/add-test-paper')
def add_test_paper():

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO papers
    (
        subject,
        title,
        filename,
        encrypted_file,
        otp,
        status
    )
    VALUES(?,?,?,?,?,?)
    """,
    (
        "Cyber Security",
        "Mid Sem",
        "paper.pdf",
        "enc_paper.pdf",
        "",
        "Encrypted"
    ))

    conn.commit()
    conn.close()

    return {"message":"Paper Added"}

@app.route('/papers')
def get_papers():

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    cursor.execute("""
    SELECT id,title,subject,status,encrypted_file
    FROM papers
    """)

    papers = cursor.fetchall()

    conn.close()

    result = []

    for paper in papers:
        result.append({
            "id": paper[0],
            "title": paper[1],
            "subject": paper[2],
            "status": paper[3],
            "file": paper[4]
        })

    return {"papers": result}


@app.route('/faculty-stats')
def faculty_stats():

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    cursor.execute(
        "SELECT COUNT(*) FROM papers"
    )
    total = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM papers WHERE status='Encrypted'"
    )
    encrypted = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM papers WHERE status='Pending'"
    )
    pending = cursor.fetchone()[0]

    conn.close()

    return {
        "total": total,
        "encrypted": encrypted,
        "pending": pending
    }

# @app.route('/hello')
# def hello():
#     return {
#         "message":"hello"
#     }
@app.route('/authority-stats')
def authority_stats():

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    cursor.execute(
        "SELECT COUNT(*) FROM papers"
    )
    total = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM papers WHERE status='Approved'"
    )
    approved = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM papers WHERE status='Pending'"
    )
    pending = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM papers WHERE status='Rejected'"
    )
    rejected = cursor.fetchone()[0]

    conn.close()

    return {
        "total": total,
        "approved": approved,
        "pending": pending,
        "rejected": rejected
    }

@app.route('/approve/<paper_id>')
def approve_paper(paper_id):

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE papers
        SET status='Approved'
        WHERE id=?
        """,
        (paper_id,)
    )

    conn.commit()
    conn.close()

    return {
        "message":"Paper Approved"
    }



@app.route('/reject/<paper_id>')
def reject_paper(paper_id):

    conn = sqlite3.connect(
        '../database/exam_system.db'
    )

    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE papers
        SET status='Rejected'
        WHERE id=?
        """,
        (paper_id,)
    )

    conn.commit()
    conn.close()

    return {
        "message":"Paper Rejected"
    }

@app.route('/download/<int:paper_id>')
def download_paper(paper_id):

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    cursor.execute(
        "SELECT encrypted_file FROM papers WHERE id=?",
        (paper_id,)
    )

    paper = cursor.fetchone()

    conn.close()

    if not paper:
        return {"error": "Paper not found"}

    filepath = os.path.join(
        ENCRYPT_FOLDER,
        paper[0]
    )
    
    print("Downloading:", filepath)

    if not os.path.exists(filepath):
        return {
            "error": f"File not found: {filepath}"
        }

    add_log("Encrypted Paper Downloaded")

    return send_file(
        filepath,
        as_attachment=True
    )

@app.route('/paper-details/<otp>')
def paper_details(otp):

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    
    cursor.execute("""
       SELECT
        id,
        title,
        subject,
        exam_date,
        exam_time,
        encrypted_file,
        status
        FROM papers
        WHERE otp=?
        """,(otp,))

    paper = cursor.fetchone()

    print("OTP =", otp)
    print("PAPER =", paper)

    conn.close()

    if paper:
        return {
            "id": paper[0],
            "title": paper[1],
            "subject": paper[2],
            "exam_date": paper[3],
            "exam_time": paper[4],
            "file": paper[5],
            "status": paper[6]
        }
        

    return {"error":"Paper not found"}

@app.route('/paraphrase', methods=['POST'])
def paraphrase():

    data = request.json

    original_text = data['text']

    paraphrased = paraphrase_text(
        original_text
    )

    return {
        "original": original_text,
        "paraphrased": paraphrased
    }


@app.route('/logs')
def get_logs():

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    cursor.execute("""
    SELECT * FROM logs
    ORDER BY id DESC
    """)

    logs = cursor.fetchall()

    conn.close()

    return {"logs": str(logs)}

@app.route('/signup', methods=['POST'])
def signup():

    data = request.json

    email = data['email']
    password = data['password']
    role = data['role']

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    try:
        cursor.execute("""
        INSERT INTO users(email,password,role)
        VALUES(?,?,?)
        """,(email,password,role))

        conn.commit()

        return jsonify({
            "message":"Signup Successful"
        })

    except sqlite3.IntegrityError:

        return jsonify({
            "message":"Email already exists"
        }),400

    finally:
        conn.close()


@app.route('/login', methods=['POST'])
def login():

    data = request.json

    email = data['email']
    password = data['password']
    role = data['role']

    conn = sqlite3.connect('../database/exam_system.db')
    cursor = conn.cursor()

    cursor.execute("""
    SELECT * FROM users
    WHERE email=? AND password=? AND role=?
    """,(email,password,role))

    user = cursor.fetchone()

    conn.close()

    if user:
        return jsonify({
            "message":"Login Successful"
        })

    return jsonify({
        "message":"Invalid Credentials"
    }),401

print("APP STARTED WITH APPROVE ROUTE")

@app.route('/test')
def test():
    return {
        "message": "Test Route Working"
    }
print(__file__)
if __name__ == "__main__":
    print(app.url_map)
    app.run(debug=False)