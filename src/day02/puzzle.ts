const parseInput = (input: string) => {
  const lines = input.split('\n');

  return lines;
};

type Direction = 'forward' | 'down' | 'up';

export const partOne = (input: string) => {
  const inp = parseInput(input);

  let hor = 0;
  let depth = 0;

  for (let i = 0; i < inp.length; i += 1) {
    const [direction, v] = inp[i].split(' ') as [Direction, string];
    const value = parseInt(v, 10);
    if (direction === 'forward') {
      hor += value;
    }
    if (direction === 'up') {
      depth -= value;
    }
    if (direction === 'down') {
      depth += value;
    }
  }

  return hor * depth;
};

export const partTwo = (input: string) => {
  const inp = parseInput(input);

  let hor = 0;
  let depth = 0;
  let aim = 0;

  for (let i = 0; i < inp.length; i += 1) {
    const [direction, v] = inp[i].split(' ') as [Direction, string];
    const value = parseInt(v, 10);
    if (direction === 'forward') {
      hor += value;
      depth += aim * value;
    }
    if (direction === 'up') {
      aim -= value;
    }
    if (direction === 'down') {
      aim += value;
    }
  }

  return hor * depth;
};
