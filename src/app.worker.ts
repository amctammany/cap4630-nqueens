/* eslint-disable no-restricted-globals */

import { GenAlgoOptions, findNonConflictingPairs, genAlgo } from "./lib/genalg";

self.onmessage = (e: MessageEvent<{ n: number } & GenAlgoOptions>) => {
  if (!e) return;
  const { n, ...options } = e.data;
  const res = genAlgo(n, findNonConflictingPairs, options);
  console.log(res);
  self.postMessage(res);
};
export {};
