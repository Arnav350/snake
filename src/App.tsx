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
  const [delay, setDelay] = useState<number | null>(null!);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState<boolean | null>(false);

  useInterval(() => runGame(), delay);

  useEffect(() => {
    let fruit = document.querySelector(".food") as HTMLCanvasElement;

    if (board.current) {
      const canvas = board.current;
      const context = canvas.getContext("2d");

      if (context) {
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.fillStyle = "green";
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.drawImage(fruit, food[0], food[1], 1, 1);
      }
    }
  }, [snake, food, gameOver]);

  function start() {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(DIRECTIONS[39]);
    setDelay(TIME_DELAY);
    setScore(0);
    setGameOver(false);
  }

  function checkCollision(head: number[]) {
    for (let i = 0; i < head.length; i++) {
      if (head[i] < 0 || head[i] * SCALE >= SIZE[0]) {
        return true;
      }
    }

    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) {
        return true;
      }
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
        setDirection(DIRECTIONS[37]);
        break;
      case "ArrowRight":
        setDirection(DIRECTIONS[39]);
        break;
      case "ArrowDown":
        setDirection(DIRECTIONS[38]);
        break;
      case "ArrowUp":
        setDirection(DIRECTIONS[40]);
        break;
    }
  }

  function runGame() {
    const newSnake = [...snake];
    const newSnakeHead = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];

    newSnake.unshift(newSnakeHead);

    if (checkCollision(newSnakeHead)) {
      setDelay(null);
      setGameOver(null);
    }

    if (!foodAte(newSnake)) {
      snake.pop();
    }

    setSnake(newSnake);
  }

  return (
    <div onKeyDown={(event) => changeDirection(event)}>
      <div className="food"></div>
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
