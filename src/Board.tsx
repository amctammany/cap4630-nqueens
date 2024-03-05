import React from "react";
import { genAlgo } from "./lib/genalg";

function Board({ src }: { src?: number[] }) {
  if (!src) return <div />;
  const n = src.length;
  const board = Array.from({ length: n }).map(() =>
    Array.from({ length: n }).map(() => "-")
  );
  src.forEach((row, col) => {
    board[col][row] = "Q";
  });
  return (
    <div className="board">
      {board.map((row, i) => (
        <div key={i} className="row">
          {row.map((col, j) => (
            <div key={j} className="tile">
              <span>{col}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
