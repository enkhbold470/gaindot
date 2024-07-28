import React, { useRef, useState } from "react";

const VideoUpload = () => {
  const videoRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.ondataavailable = (event) =>
      setChunks((prev) => [...prev, event.data]);
    recorder.start();
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
  };

  const sendVideoToBackend = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const formData = new FormData();
    formData.append("video", blob);

    // Log the FormData entries
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

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
      <video ref={videoRef} autoPlay></video>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={sendVideoToBackend}>Upload Video</button>
    </div>
  );
};

export default VideoUpload;
