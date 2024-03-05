import { useState } from "react";
import "./App.css";
import { weightedRand, weightedRandChoice } from "./lib/utils";
import {
  findNonConflictingPairs,
  genAlgo,
  generateInitialPopulation,
} from "./lib/genalg";
import ResultDisplay from "./ResultDisplay";

type Result = ReturnType<typeof genAlgo>;
function App() {
  const [n, setN] = useState(8);
  const [timer, setTimer] = useState(1000);
  const [result, setResult] = useState<Result>();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;
    if (name === "n") setN(parseInt(value));
    if (name === "timeout") setTimer(parseInt(value));
  };
  const handleSolve: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const initialPopulation = generateInitialPopulation(n, 100);
    const res = genAlgo(initialPopulation, findNonConflictingPairs);
    console.log(res);
    setResult(res);
  };

  return (
    <>
      <h1>N Queens Problem </h1>
      <h4>Genetic Algorithm Approach</h4>
      <div>
        <label htmlFor="n">N</label>
        <input
          type="number"
          id="n"
          name="n"
          value={n}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="n">Timeout</label>
        <input
          type="number"
          id="timer"
          name="timer"
          value={timer}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSolve}>Solve</button>
      <ResultDisplay {...result} />
    </>
  );
}

export default App;
