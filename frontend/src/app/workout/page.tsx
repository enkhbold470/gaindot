"use client";
import VideoUpload from "@/components/video";

export default function Home() {
  return (
    <div className="flex m-4 p-4 items-center">
      <h1>Video upload</h1>
      <VideoUpload />
    </div>
  );
}
