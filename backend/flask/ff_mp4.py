from moviepy.editor import VideoFileClip


def convert_webm_to_mp4(input_path, output_path):
    clip = VideoFileClip(input_path)
    clip.write_videofile(output_path, codec="libx264", audio_codec="aac")


convert_webm_to_mp4("blob.webm", "obt.mp4")
