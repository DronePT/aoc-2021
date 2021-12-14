export const createTimer = () => {
  let last = Date.now();
  return {
    reset() {
      last = Date.now();
    },
    print() {
      console.warn(`took ${Date.now() - last}ms`);
      this.reset();
    },
  };
};

export const runPuzzle = (day: number, name: string, fn: () => void) => {
  console.warn(`Day ${day}, part ${name}:`);
  const timer = createTimer();
  console.warn(fn());
  timer.print();
};
