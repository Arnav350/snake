import React, { useEffect } from "react";
import "./Food.css";

function Food() {
  const food = document.querySelector<HTMLDivElement>(".food")?.style;

  useEffect(() => {
    const size = 25;

    let foodX;
    let foodY;
    foodX = size * Math.floor(Math.random() * 16);
    foodY = size * Math.floor(Math.random() * 16);
    if (food) {
      food.width = `${size}px`;
      food.height = `${size}px`;
      food.left = `${foodX}px`;
      food.top = `${foodY}px`;
    }
  });

  return (
    <div>
      <div className="food"></div>
    </div>
  );
}

export default Food;
