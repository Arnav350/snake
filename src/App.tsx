import React, { useState, useEffect, useRef } from "react";
import useInterval from "./useInterval";
import {
  SIZE,
  SCALE,
  SPEED,
  DIRECTIONS,
  START_SNAKE,
  START_FOOD,
} from "./constants";
import "./App.css";

function App() {
  const board = useRef<HTMLDivElement>(null!);
  const [snake, setSnake] = useState(START_SNAKE);
  const [food, setFood] = useState(START_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState([0, -1]);
  const [speed, setSpeed] = useState(null!);

  console.log(board);

  if (board.current) {
    board.current.style.height = `${SIZE[1]}px`;
    board.current.style.width = `${SIZE[0]}px`;
  }

  function start() {}

  function end() {}

  function move(event: any) {}

  function spawnFood() {}

  function eatFood() {}

  function crash() {}

  function gameLoop() {}

  useEffect(() => {}, [snake, food, gameOver]);

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        className="board"
        ref={board}
        onKeyDown={(event) => move(event)}
      ></div>
      {gameOver && <div>Game Over!</div>}
      <button onClick={start}>Start</button>
    </div>
  );
}

export default App;
