from openai import OpenAI
import cv2
import base64
import os
import shutil
from dotenv import load_dotenv
from ff_mp4 import convert_webm_to_mp4
import subprocess

load_dotenv(".env")

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)


def visualProcessing(file_path, cd_file_path, prompt):

    convert_webm_to_mp4(file_path, cd_file_path)

    # print("Video converted to mp4:")
    video = cv2.VideoCapture(cd_file_path)

    base64Frames = []
    while video.isOpened():
        success, frame = video.read()
        if not success:
            break
        _, buffer = cv2.imencode(".jpg", frame)
        base64Frames.append(base64.b64encode(buffer).decode("utf-8"))

    video.release()
    print(len(base64Frames), "frames read.")

    PROMPT_MESSAGES = [
        {
            "role": "user",
            "content": [
                f"{prompt}",
                *map(
                    lambda x: {"image": x, "resize": 768},
                    base64Frames[0 : len(base64Frames) // 2],
                ),
            ],
        },
    ]
    params = {
        "model": "gpt-4o-mini",
        "messages": PROMPT_MESSAGES,
        "max_tokens": 200,
    }

    result = client.chat.completions.create(**params)
    print(result.choices[0].message.content)
    os.remove(file_path)
    os.remove(cd_file_path)
    return result.choices[0].message.content
