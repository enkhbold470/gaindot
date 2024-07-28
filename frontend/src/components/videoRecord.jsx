import React, { useRef, useState } from "react";

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [stream, setStream] = useState(null);
  const [recordedVideoURL, setRecordedVideoURL] = useState(null);

  const startRecordingWithDelay = async (delay) => {
    setTimeout(async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);

      const recorder = new MediaRecorder(mediaStream);
      recorder.ondataavailable = (event) =>
        setChunks((prev) => [...prev, event.data]);
      recorder.start();
      setMediaRecorder(recorder);
    }, delay);
  };

  const stopRecordingWithDelay = (delay) => {
    setTimeout(() => {
      if (mediaRecorder) {
        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }, delay);
  };

  const saveRecording = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const videoURL = URL.createObjectURL(blob);
    setRecordedVideoURL(videoURL);

    // Optionally, send the video to the backend
    const formData = new FormData();
    formData.append("video", blob);

    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => console.log("Video uploaded successfully:", result))
      .catch((error) => console.error("Error uploading video:", error));
  };

  return (
    <div className="text-white">
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "100%", maxWidth: "600px" }}
      ></video>
      <div>
        <button
          onClick={() => startRecordingWithDelay(1000)}
          className="border p-2 m-2"
        >
          Start Recording after 3s
        </button>
        <button
          onClick={() => stopRecordingWithDelay(1000)}
          className="border p-2 m-2"
        >
          Stop Recording after 5s
        </button>
        <button onClick={saveRecording} className="border p-2 m-2">
          Save Recording
        </button>
      </div>
      {recordedVideoURL && (
        <div>
          <h3>Recorded Video:</h3>
          <video
            src={recordedVideoURL}
            controls
            style={{ width: "100%", maxWidth: "600px" }}
          ></video>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
