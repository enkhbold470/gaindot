#!/usr/bin/env python
import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "./uploads"
app.config["MAX_CONTENT_LENGTH"] = 1024 * 1024 * 1024  # 1GB
CORS(app)

if not os.path.exists(app.config["UPLOAD_FOLDER"]):
    os.makedirs(app.config["UPLOAD_FOLDER"])


@app.route("/")
def root():
    return "SERVER IS RUNNING"


@app.route("/upload", methods=["POST"])
def upload_video():
    if "video" not in request.files:
        return jsonify({"error": "No video part in the request"}), 400

    file = request.files["video"]
    if file.filename == "":
        return jsonify({"error": "No selected video"}), 400

    # Save the file
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    # Here you can process the video if needed
    # process_video(file_path)

    return (
        jsonify({"message": "Video uploaded successfully", "file_path": file_path}),
        200,
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.environ.get("FLASK_SERVER_PORT", 5000), debug=True)
