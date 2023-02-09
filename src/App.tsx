import React, { useState, useEffect, useRef } from "react";
import useInterval from "./useInterval";
import {
  SIZE,
  SCALE,
  TIME_DELAY,
  DIRECTIONS,
  INITIAL_SNAKE,
  INITIAL_FOOD,
} from "./constants";
import "./App.css";

function App() {
  const board = useRef<HTMLCanvasElement>(null!);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number>(null!);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useInterval(() => runGame(), delay);

  return (
    <div onKeyDown={(event) => setDirection(event)}>
      <div></div>
      <canvas
        className="board"
        ref={board}
        height={`${SIZE[1]}px`}
        width={`${SIZE[0]}px`}
      />
      {gameOver && <div className="over">Game Over</div>}
      <button className="start" onClick={start}>
        Play
      </button>
      <div className="score__container">
        <h2 className="score">Score: {score}</h2>
      </div>
    </div>
  );
}

export default App;
