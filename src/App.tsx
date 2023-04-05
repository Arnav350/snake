import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import useInterval from "./useInterval";
import {
  SIZE,
  SCALE,
  START_SNAKE,
  START_FOOD,
  DIRECTIONS,
  SPEED,
} from "./constants";

function App() {
  const board = useRef<HTMLCanvasElement>(null!);

  const [snake, setSnake] = useState<number[][]>(START_SNAKE);
  const [food, setFood] = useState<number[]>(START_FOOD);
  const [direction, setDirection] = useState<number[]>(DIRECTIONS.NONE);
  const [speed, setSpeed] = useState<number>(SPEED[1]);
  const [delay, setDelay] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useInterval(() => runGame(), delay);

  useEffect(() => {
    if (board.current) {
      const canvas: HTMLCanvasElement = board.current;
      const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (context) {
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, SIZE[0], SIZE[1]);
        context.fillStyle = "#a3d001";
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.fillStyle = "#e05151";
        context.fillRect(food[0], food[1], 1, 1);
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
      setDirection(DIRECTIONS.NONE);
    }
    if (!foodAte(newSnake)) {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  function start() {
    setSnake(START_SNAKE);
    setFood(START_FOOD);
    setDirection(DIRECTIONS.RIGHT);
    setDelay(speed);
    setScore(0);
    setGameOver(false);
  }

  function checkCollision(head: number[]) {
    for (let i: number = 0; i < head.length; i++) {
      if (head[i] < 0 || head[i] * SCALE >= SIZE[0]) return true;
    }
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }
    return false;
  }

  function foodAte(newSnake: number[][]) {
    let coord: number[] = food.map(() =>
      Math.floor((Math.random() * SIZE[0]) / SCALE)
    );
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      let newFood = coord;
      setScore(score + 1);
      setFood(newFood);
      return true;
    }
    return false;
  }

  function changeDirection(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!gameOver) {
      switch (event.key) {
        case "a":
        case "ArrowLeft":
          setDirection(DIRECTIONS.LEFT);
          break;
        case "d":
        case "ArrowRight":
          setDirection(DIRECTIONS.RIGHT);
          break;
        case "w":
        case "ArrowUp":
          setDirection(DIRECTIONS.UP);
          break;
        case "s":
        case "ArrowDown":
          setDirection(DIRECTIONS.DOWN);
          break;
      }
    }
  }

  return (
    <div
      className="game"
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) =>
        changeDirection(event)
      }
    >
      <div className="top">
        <div className="logo">SNAKE</div>
      </div>
      <div className="content">
        <div className="buttons">
          <div className="speeds">
            <button
              className="speed"
              onClick={() => setSpeed(SPEED[0])}
              style={speed === SPEED[0] ? { backgroundColor: "#f00" } : {}}
            >
              SLOW
            </button>
            <button
              className="speed"
              onClick={() => setSpeed(SPEED[1])}
              style={speed === SPEED[1] ? { backgroundColor: "#f00" } : {}}
            >
              MID
            </button>
            <button
              className="speed"
              onClick={() => setSpeed(SPEED[2])}
              style={speed === SPEED[2] ? { backgroundColor: "#f00" } : {}}
            >
              FAST
            </button>
          </div>
          <button className="start" onClick={start}>
            PRESS to PLAY
          </button>
        </div>
        <div className="screen">
          <div className="info">
            <h2 className="lives">Lives: 1</h2>
            <h2 className="score">Score: {score}</h2>
          </div>
          <canvas
            className="board"
            ref={board}
            width={`${SIZE[0]}px`}
            height={`${SIZE[1]}px`}
          />
          {gameOver && <div className="over">Game Over</div>}
        </div>
        <div className="arrows">
          <div
            className="left"
            style={
              direction === DIRECTIONS.LEFT ? { backgroundColor: "#f00" } : {}
            }
          ></div>
          <div
            className="right"
            style={
              direction === DIRECTIONS.RIGHT ? { backgroundColor: "#f00" } : {}
            }
          ></div>
          <div
            className="up"
            style={
              direction === DIRECTIONS.UP ? { backgroundColor: "#f00" } : {}
            }
          ></div>
          <div
            className="down"
            style={
              direction === DIRECTIONS.DOWN ? { backgroundColor: "#f00" } : {}
            }
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
