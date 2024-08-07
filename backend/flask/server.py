#!/usr/bin/env python
import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from video import visualProcessing
from dotenv import load_dotenv

load_dotenv(".env")

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
    try:
        if "video" not in request.files:
            return jsonify({"error": "No video part in the request"}), 400

        file = request.files["video"]
        if file.filename == "":
            return jsonify({"error": "No selected video"}), 400

        # Save the file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)

        exercise = visualProcessing(
            file_path,
            "video.mp4",
        )
        print(f"Video saved to: {file_path}")

        # with json format of four attributes, exercise, accuracy percentage, and booleanApproved. if exercise is not recognized, return None on exercise attribute and booleanApproved as False.
        booleanApproved = True
        if exercise == 0:
            booleanApproved = False
        print(f"Exercise: {exercise}")
        return (
            jsonify({"exercise": exercise, "booleanApproved": booleanApproved}),
            200,
        )

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred during processing"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.environ.get("FLASK_SERVER_PORT", 5000), debug=True)
