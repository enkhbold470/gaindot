// import VideoRecorder from "@/components/videoRecord";
// import { MultiStepLoaderDemo } from "@/components/multistep";
"use client";
import React, { useEffect, useState } from "react";
import Game from "@/components/game/page";
import Address from "@/lib/Instruction.json";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const loop = false; // This might be dynamic in your actual code

  // useEffect(() => {
  //   if (loading) {
  //     const timer = setTimeout(() => {
  //       // Action to perform after duration ends
  //       setLoading(false);
  //       setShowDashboard(true);
  //     }, 5000); // Assuming '100' is the duration in milliseconds
  //     // Cleanup function to clear the timeout
  //     return () => clearTimeout(timer);
  //   }
  // }, [loading]); // This effect depends on the `loop` state
  return (
    <>
      <SignedOut>
        <SignInButton />
        <p className="text-white">Please sign in to view this page.</p>
      </SignedOut>
      <SignedIn>
        <div className="w-screen flex justify-center">
          {/* Core Loader Modal */}
          <Loader
            loadingStates={Address.map((title) => ({
              text: title.tutorial,
            }))}
            loading={loading}
            duration={1500}
            loop={false}
          />
          {/*when game is loading and it will show start button */}
          {loading && (
            <div className="flex justify-center border-5 border-white w-screen  m-2">
              <button
                className=" justify-center items-center font-extrabold text-white bg-purple-700 z-[120] mt-10 p-5 rounded-xl"
                onClick={() => {
                  setLoading(false);
                  setShowGame(false);
                }}
              >
                START
              </button>
            </div>
          )}
        </div>
        <div className=" flex justify-center p-5 m-5">
          {loading === false && showGame === false && (
            <div className="w-[30rem] z-[99]  flex flex-col items-center">
              <p className="text-white p-1 m-1">
                This is how you look when you do push-ups.
              </p>
              <img
                src="/pushup.jpeg"
                alt="push-ups"
                className="rounded-xl border-2 border-purple-700"
              />
              <button
                onClick={() => {
                  setShowTutorial(false);
                  setShowGame(true);
                }}
                className="w-[20rem] font-extrabold text-white bg-purple-700 z-[120] mt-10 p-5 rounded-xl"
              >
                Ok, Got it!
              </button>
            </div>
          )}
          {showGame === true && <Game />}
        </div>
      </SignedIn>
    </>
  );
}

const Home = () => {
  return (
    <div className="flex justify-center p-2 m-2">
      {/* <h1>Video upload</h1> */}
      {/* <VideoRecorder /> */}

      <Game />
      {/* <MultiStepLoaderDemo /> */}
    </div>
  );
};
