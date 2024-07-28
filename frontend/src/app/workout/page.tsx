"use client";
import VideoRecorder from "@/components/videoRecord";

export default function Home() {
  return (
    <div className="flex m-4 p-4 items-center">
      <h1>Video upload</h1>
      <VideoRecorder />
    </div>
  );
}
