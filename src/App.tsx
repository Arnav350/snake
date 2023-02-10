import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import AppleLogo from "./applePixels.png";
import useInterval from "./useInterval";
import {
  SIZE,
  SCALE,
  START_SNAKE,
  START_FOOD,
  DIRECTIONS,
  DELAY,
} from "./constants";

function App() {
  const board = useRef<HTMLCanvasElement>(null!);
  const [snake, setSnake] = useState(START_SNAKE);
  const [food, setFood] = useState(START_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [delay, setDelay] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useInterval(() => runGame(), delay);

  useEffect(() => {
    let fruit = document.querySelector(".fruit") as HTMLCanvasElement;
    if (board.current) {
      const canvas = board.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, SIZE[0], SIZE[1]);
        context.fillStyle = "#a3d001";
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.drawImage(fruit, food[0], food[1], 1, 1);
      }
    }
  }, [snake, food, gameOver]);

  function runGame() {
    const newSnake: number[][] = [...snake];
    const newSnakeHead: number[] = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];
    newSnake.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) {
      setDelay(null);
      setGameOver(true);
    }
    if (!foodAte(newSnake)) {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  function start() {
    START_FOOD[0] = Math.floor((Math.random() * SIZE[0]) / SCALE);
    START_FOOD[1] = Math.floor((Math.random() * SIZE[1]) / SCALE);

    setSnake(START_SNAKE);
    setFood(START_FOOD);
    setDirection([1, 0]);
    setDelay(DELAY);
    setScore(0);
    setGameOver(false);
  }

  function checkCollision(head: number[]) {
    for (let i = 0; i < head.length; i++) {
      if (head[i] < 0 || head[i] * SCALE >= SIZE[0]) return true;
    }
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }
    return false;
  }

  function foodAte(newSnake: number[][]) {
    let coord = food.map(() => Math.floor((Math.random() * SIZE[0]) / SCALE));
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      let newFood = coord;
      setScore(score + 1);
      setFood(newFood);
      return true;
    }
    return false;
  }

  function changeDirection(event: React.KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowLeft":
        setDirection(DIRECTIONS.LEFT);
        break;
      case "ArrowRight":
        setDirection(DIRECTIONS.RIGHT);
        break;
      case "ArrowUp":
        setDirection(DIRECTIONS.UP);
        break;
      case "ArrowDown":
        setDirection(DIRECTIONS.DOWN);
        break;
    }
  }

  return (
    <div onKeyDown={(event) => changeDirection(event)}>
      <img className="fruit" src={AppleLogo} alt="fruit" width="30" />
      {/* <div className="fruit"></div> */}
      <canvas
        className="board"
        ref={board}
        width={`${SIZE[0]}px`}
        height={`${SIZE[1]}px`}
      />
      {gameOver && <div className="over">Game Over</div>}
      <button className="start" onClick={start}>
        PLAY
      </button>
      <div className="score">
        <h2>Score: {score}</h2>
      </div>
    </div>
  );
}

export default App;
