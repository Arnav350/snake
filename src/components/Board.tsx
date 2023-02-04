import React from "react";
import Food from "./Food";
import Snake from "./Snake";
import "./Board.css";

function Board() {
  return (
    <div>
      <div className="board">
        <Food />
        <Snake />
      </div>
    </div>
  );
}

export default Board;
