import React from "react";
import { genAlgo } from "./lib/genalg";
import Board from "./Board";

function ResultDisplay(props: Partial<ReturnType<typeof genAlgo>>) {
  if (!props.bestFound) return <div></div>;
  const {
    bestScore,
    maxScore,
    bestFound,
    optimalFound,
    generationCount,
    timeElapsed,
  } = props;
  return (
    <div className="">
      <div>
        <b>Best Score: </b>
        <i>
          {bestScore} (Max {maxScore?.toString()})
        </i>
      </div>
      <div>
        <b>Optimal Solution Found: </b>
        <i>{optimalFound?.toString()}</i>
      </div>
      <div>
        <b>Generations Used: </b>
        <i>{generationCount?.toString()}</i>
      </div>

      <div>
        <b>Time Elapsed: </b>
        <i>{timeElapsed?.toString()} ms</i>
      </div>
      <Board src={bestFound} />
    </div>
  );
}

export default ResultDisplay;
