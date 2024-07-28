import subprocess


def convert_webm_to_mp4(webm_path, mp4_path):
    command = f"ffmpeg -y -i {webm_path} {mp4_path}"
    subprocess.run(command, shell=True)
    print("Video converted to mp4:")
    return mp4_path
