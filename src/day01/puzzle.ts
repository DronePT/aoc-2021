const parseInput = (input: string) => {
  const lines = input.split('\n').map(Number);

  return lines;
};

export const partOne = (input: string) => {
  const measures = parseInput(input);

  let last = Number.MAX_SAFE_INTEGER;
  let inc = 0;

  for (const measure of measures) {
    if (measure > last) inc += 1;
    last = measure;
  }

  return inc;
};

export const partTwo = (input: string) => {
  const measures = parseInput(input);

  let lastSum = Number.MAX_SAFE_INTEGER;
  let inc = 0;

  for (let i = 0; i < measures.length - 2; i += 1) {
    const sum = measures[i] + measures[i + 1] + measures[i + 2];

    if (sum > lastSum) inc += 1;
    lastSum = sum;
  }

  return inc;
};
