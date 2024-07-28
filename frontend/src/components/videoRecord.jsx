// components/VideoRecorder.js
import React, { useRef, useState } from "react";
import { MultiStepLoaderDemo } from "@/components/multistep";

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [stream, setStream] = useState(null);
  const [recordedVideoURL, setRecordedVideoURL] = useState(null);
  const [response, setResponse] = useState(null);
  const [uploadResponse, setUploadResponse] = useState("");

  const startRecording = async () => {
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
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    stream.getTracks().forEach((track) => track.stop());
    setStream(null);
  };

  const saveRecording = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const videoURL = URL.createObjectURL(blob);
    setRecordedVideoURL(videoURL);

    // Optionally, send the video to the backend
    const formData = new FormData();
    formData.append("video", blob, "video.webm");

    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log("Video uploaded successfully:", result);
        setUploadResponse(result); // Store the response
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
        setUploadResponse("Error uploading video"); // Store the response
      });
  };
  response && console.log(response);

  return (
    <div className="text-white flex justify-center h-screen w-screen">
      <video
        ref={videoRef}
        autoPlay
        className="h-1/2 w-1/2 border-2 rounded-[5rem]"
      ></video>
      <div className="flex flex-col gap-2 m-2 p-2">
        <button
          onClick={startRecording}
          className="border p-2 m-2 rounded-[1rem]"
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          className="border p-2 m-2 rounded-[1rem]"
        >
          Stop Recording
        </button>
        <button
          onClick={saveRecording}
          className="border p-2 m-2 rounded-[1rem]"
        >
          Save Recording
        </button>
      </div>
      {recordedVideoURL && (
        <div>
          <h3>Recorded Video:</h3>
          <video
            src={recordedVideoURL}
            controls
            style={{ width: "100%", maxWidth: "800px" }}
          ></video>
        </div>
      )}
      {uploadResponse && (
        <div>
          <h3>Upload Response:</h3>
          <p>{uploadResponse}</p>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
