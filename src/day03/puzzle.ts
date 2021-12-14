const parseInput = (input: string) => {
  const lines = input.split('\n');

  return lines;
};

export const partOne = (input: string) => {
  const inp = parseInput(input);

  const size = inp[0].length;

  let gamma = '';
  let epsilon = '';

  for (let bitPos = 0; bitPos < size; bitPos += 1) {
    const count: { [key: string]: number } = { '0': 0, '1': 0 };

    for (let row = 0; row < inp.length; row += 1) {
      count[inp[row][bitPos]] += 1;
    }

    if (count['0'] > count['1']) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

export const partTwo = (input: string) => {
  const inp = parseInput(input);

  const size = inp[0].length;

  let oxygen = inp.slice();
  let co2 = inp.slice();

  for (let bitPos = 0; bitPos < size; bitPos += 1) {
    const countMost: { [key: string]: number } = { '0': 0, '1': 0 };
    const countLeast: { [key: string]: number } = { '0': 0, '1': 0 };

    if (oxygen.length > 1) {
      for (let row = 0; row < oxygen.length; row += 1) {
        countMost[oxygen[row][bitPos]] += 1;
      }

      const mostCommon = countMost['0'] > countMost['1'] ? '0' : '1';
      oxygen = oxygen.filter((o) => o[bitPos] === mostCommon);
    }

    if (co2.length > 1) {
      for (let row = 0; row < co2.length; row += 1) {
        countLeast[co2[row][bitPos]] += 1;
      }

      const leastCommon = countLeast['1'] < countLeast['0'] ? '1' : '0';
      co2 = co2.filter((o) => o[bitPos] === leastCommon);
    }
  }

  return parseInt(oxygen[0], 2) * parseInt(co2[0], 2);
};
