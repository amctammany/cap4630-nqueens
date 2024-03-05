import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { genAlgo, GenAlgoOptions } from "./lib/genalg";
import ResultDisplay from "./ResultDisplay";
type Props = {
  color?: "black" | "white";
  size?: number;
  display?: "inline-block" | "block";
};

const Loader = ({
  color = "black",
  size = 200,
  display = "inline-block",
}: Props) => {
  return (
    <div
      style={{
        border: `4px solid ${color}`,
        margin: "20px",
        width: `${size}px`,
        height: `${size}px`,
        borderRightColor: "transparent",
        borderRadius: "50%",
        display,
        //margin: display === "block" ? "50px auto" : "none",
      }}
      className="loader"
    ></div>
  );
};
type Result = ReturnType<typeof genAlgo>;
function App() {
  const reser = useMemo(
    () =>
      new Worker(new URL("./app.worker.ts", import.meta.url), {
        type: "module",
      }),
    []
  );

  const [n, setN] = useState(8);
  const [options, setOptions] = useState<GenAlgoOptions>({
    timeout: 60000,
    populationSize: 500,
    mutationRate: 0.03,
    mixingNumber: 2,
  });
  const [result, setResult] = useState<
    { loading: boolean } & Partial<Result>
  >();
  useEffect(() => {
    if (window.Worker) {
      reser.onmessage = (e: MessageEvent<Result>) => {
        setResult({ ...e.data, loading: false });
      };
    }
  }, [reser]);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;
    if (name === "n") {
      setN(parseInt(value));
    } else {
      setOptions((old) => ({ ...old, [name]: parseInt(value) }));
    }
  };
  const handleSolve: React.MouseEventHandler<HTMLButtonElement> = () => {
    setResult({ loading: true });
    reser.postMessage({ n, ...options });
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
          min={4}
          max={20}
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
        <label htmlFor="mixingNumber">Mixing Number</label>
        <input
          type="number"
          id="mixingNumber"
          name="mixingNumber"
          value={options.mixingNumber}
          onChange={handleChange}
        />
      </div>
      <button disabled={result?.loading} onClick={handleSolve}>
        Solve
      </button>
      <div>{result?.loading ? <Loader /> : <ResultDisplay {...result} />}</div>
    </>
  );
}

export default App;
