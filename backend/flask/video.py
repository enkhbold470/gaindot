from openai import OpenAI
import cv2
import base64
import os
import shutil
from dotenv import load_dotenv
from ff_mp4 import convert_webm_to_mp4
import subprocess

load_dotenv(".env")
folder_path = "./uploads/blob.webm"


client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)
command = f"ffmpeg -i ./uploads/blob.webm ./uploads/blob.mp4"
subprocess.run(command, shell=True)
print("Video converted to mp4:  ./uploads/blob.mp4")
video = cv2.VideoCapture("./uploads/blob.mp4")


base64Frames = []
while video.isOpened():
    success, frame = video.read()
    if not success:
        break
    _, buffer = cv2.imencode(".jpg", frame)
    base64Frames.append(base64.b64encode(buffer).decode("utf-8"))

video.release()
print(len(base64Frames), "frames read.")


def save_and_delete_frames(video_path, folder_path):
    # Create the folder to save frames
    os.makedirs(folder_path, exist_ok=True)

    video = cv2.VideoCapture(video_path)
    frame_count = 0

    while video.isOpened():
        success, frame = video.read()
        if not success:
            break
        frame_path = os.path.join(folder_path, f"frame_{frame_count:04d}.jpg")
        cv2.imwrite(frame_path, frame)
        frame_count += 1

    video.release()
    print(f"{frame_count} frames read and saved in {folder_path}")

    # Delete the folder after use
    # shutil.rmtree(folder_path)
    # print(f"Folder {folder_path} and all its contents have been deleted.")


PROMPT_MESSAGES = [
    {
        "role": "user",
        "content": [
            "Tell me which exercise it.",
            *map(lambda x: {"image": x, "resize": 768}, base64Frames[0::50]),
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


# response = client.chat.completions.create(
#     model="gpt-4o-mini",
#     messages=[
#         {
#             "role": "user",
#             "content": [
#                 {"type": "text", "text": "What’s in this image?"},
#                 {
#                     "type": "image_url",
#                     "image_url": {
#                         "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
#                         "detail": "high",
#                     },
#                 },
#             ],
#         }
#     ],
#     max_tokens=300,
# )

# print(response.choices[0].message.content)
