import { useState } from "react";
import "./App.css";
import { weightedRand, weightedRandChoice } from "./lib/utils";
import {
  findNonConflictingPairs,
  genAlgo,
  GenAlgoOptions,
  generateInitialPopulation,
} from "./lib/genalg";
import ResultDisplay from "./ResultDisplay";

type Result = ReturnType<typeof genAlgo>;
function App() {
  const [n, setN] = useState(8);
  const [options, setOptions] = useState<GenAlgoOptions>({
    timeout: 60000,
    populationSize: 500,
    mutationRate: 0.03,
    p: 2,
  });
  const [result, setResult] = useState<Result>();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;
    if (name === "n") {
      setN(parseInt(value));
    } else {
      setOptions((old) => ({ ...old, [name]: parseInt(value) }));
    }
    //if (name === "timeout") setTimer(parseInt(value));
  };
  const handleSolve: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    //const initialPopulation = generateInitialPopulation(n, 100);
    const res = genAlgo(n, findNonConflictingPairs, options);
    console.log(res);
    setResult(res);
  };

  return (
    <>
      <h1>N Queens Problem </h1>
      <h4>Genetic Algorithm Approach</h4>
      <div className="prop">
        <label htmlFor="n">N</label>
        <input
          type="number"
          id="n"
          name="n"
          value={n}
          onChange={handleChange}
        />
      </div>
      <div className="prop">
        <label htmlFor="timeout">Timeout</label>
        <input
          type="number"
          id="timeout"
          name="timeout"
          value={options.timeout}
          onChange={handleChange}
        />
      </div>
      <div className="prop">
        <label htmlFor="populationSize">Population Size</label>
        <input
          type="number"
          id="populationSize"
          name="populationSize"
          value={options.populationSize}
          onChange={handleChange}
        />
      </div>
      <div className="prop">
        <label htmlFor="mutationRate">Mutation Rate</label>
        <input
          type="number"
          id="mutationRate"
          step="0.01"
          name="mutationRate"
          value={options.mutationRate}
          onChange={handleChange}
        />
      </div>
      <div className="prop">
        <label htmlFor="p">P</label>
        <input
          type="number"
          id="p"
          name="p"
          value={options.p}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSolve}>Solve</button>
      <ResultDisplay {...result} />
    </>
  );
}

export default App;
