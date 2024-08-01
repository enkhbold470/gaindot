"use client";
import { useEffect, useState } from "react";
import Bird from "@/components/Bird";
import Pipe from "@/components/Pipe";

export default function Game() {
  const [birdPosition, setBirdPosition] = useState(250);
  const [pipeHeight, setPipeHeight] = useState(200);
  const [pipeLeft, setPipeLeft] = useState(500);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gravity = 1;
  const birdSize = 30;
  const gameHeight = 700;
  const pipeWidth = 50;
  const pipeGap = 350;
  const speed = 3;

  useEffect(() => {
    let gameInterval;
    if (!gameOver) {
      gameInterval = setInterval(() => {
        setBirdPosition((pos) => pos + gravity);
        setPipeLeft((left) => {
          if (left < -pipeWidth) {
            setPipeHeight(Math.floor(Math.random() * (gameHeight - pipeGap)));
            setScore((score) => score + 1);

            return 500;
          }
          return left - speed;
        });
      }, 30);
    }
    return () => clearInterval(gameInterval);
  }, [gameOver]);

  useEffect(() => {
    const handleScreenClick = () => {
      if (!gameOver) {
        setBirdPosition((pos) => Math.max(pos - 50, 0));
      }
    };
    window.addEventListener("click", handleScreenClick);
    return () => window.removeEventListener("click", handleScreenClick);
  }, [gameOver]);

  useEffect(() => {
    const birdTop = birdPosition;
    const birdBottom = birdPosition + birdSize;
    const pipeTop = pipeHeight;
    const pipeBottom = pipeHeight + pipeGap;

    if (
      birdBottom > gameHeight ||
      (birdTop < pipeTop &&
        pipeLeft < birdSize + 50 &&
        pipeLeft + pipeWidth > 50) ||
      (birdBottom > pipeBottom &&
        pipeLeft < birdSize + 50 &&
        pipeLeft + pipeWidth > 50)
    ) {
      setGameOver(true);
    }
  }, [birdPosition, pipeHeight, pipeLeft]);

  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: gameHeight,
        overflow: "hidden",
        backgroundColor: "black",
        border: "4px solid purple",
        //round the corners
        borderRadius: "20px",
      }}
    >
      <Bird position={birdPosition} />
      <Pipe top={0} left={pipeLeft} height={pipeHeight} />
      <Pipe
        top={pipeHeight + pipeGap}
        left={pipeLeft}
        height={gameHeight - pipeHeight - pipeGap}
      />
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "red",
        }}
      >
        Score: {score}
      </div>
      {gameOver && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "36px",
            fontWeight: "bold",
            color: "red",
          }}
        >
          Game Over <br />
          Score: {score}
          <button
            onClick={() => {
              setBirdPosition(250);
              setPipeHeight(200);
              setPipeLeft(500);
              setScore(0);
              setGameOver(false);
            }}
            className="text-white bg-purple-700 p-4 rounded-lg"
          >
            Lets do it again
          </button>
        </div>
      )}
    </div>
  );
}
