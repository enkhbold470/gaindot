import shutil
import os
import cv2


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
    shutil.rmtree(folder_path)
    print(f"Folder {folder_path} and all its contents have been deleted.")
