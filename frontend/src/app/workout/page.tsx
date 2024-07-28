"use client";
import VideoInput from "@/components/video";

export default function Home() {
  return (
    <div className="flex justify-center">
      <h1>Video upload</h1>
      <VideoInput width={400} height={300} />
    </div>
  );
}
