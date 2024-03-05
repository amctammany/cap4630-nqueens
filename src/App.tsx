import { useState } from "react";
import "./App.css";
import { weightedRand, weightedRandChoice } from "./lib/utils";
import { findNonConflictingPairs } from "./lib/genalg";

function App() {
  const [n, setN] = useState(8);
  const [timer, setTimer] = useState(1000);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;
    if (name === "n") setN(parseInt(value));
    if (name === "timeout") setTimer(parseInt(value));
  };
  const handleSolve: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // Tested weightedRandChoice
    //const res = { 0: 0, 1: 0, 2: 0, 3: 0 };
    //for (let i = 0; i < 10000; i++) {
    //const r = weightedRand([0.2, 0.4, 0.1, 0.4]);
    //if (r !== undefined) res[r]++;
    //}
    const res = weightedRandChoice(
      ["1234", "2123", "4123", "3344"],
      [0.2, 0.4, 0.1, 0.4],
      2
    );
    console.log(res);
    //console.log(findNonConflictingPairs("24613578"));

    const solution = "13572064";
    console.log(findNonConflictingPairs(solution), (8 * 7) / 2);
  };

  return (
    <>
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
    </>
  );
}

export default App;
