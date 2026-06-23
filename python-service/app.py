from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/verify-face", methods=["POST"])
def verify_face():
    return jsonify({
        "success": True,
        "verified": True
    })

if __name__ == "__main__":
    app.run(port=8000, debug=True)