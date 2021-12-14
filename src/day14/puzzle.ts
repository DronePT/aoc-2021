const parseInput = (input: string): Parsed => {
  const [template, rulesRaw] = input.split('\n\n');
  const rulesArr = rulesRaw.split('\n');

  const rules: { [key: string]: string } = {};

  for (const rule of rulesArr) {
    const [k, v] = rule.split(' -> ');
    rules[k] = v;
  }

  return { template, rules };
};

interface Parsed {
  template: string;
  rules: { [key: string]: string };
}

export const partOne = (input: string) => {
  const parsed = parseInput(input);

  let { template } = parsed;

  for (let step = 0; step < 10; step += 1) {
    let tmpTpl = template[0];
    for (let i = 0; i < template.length - 1; i += 1) {
      const k = template[i] + template[i + 1];

      const v = parsed.rules[k];
      tmpTpl += v + template[i + 1];
    }

    template = tmpTpl;
  }

  const count: { [key: string]: number } = {};

  for (let i = 0; i < template.length; i += 1) {
    const l = template[i];
    count[l] = (count[l] || 0) + 1;
  }

  let most = 0;
  let least = Number.MAX_SAFE_INTEGER;

  for (const k in count) {
    if (count[k] > most) {
      most = count[k];
    }
    if (count[k] < least) {
      least = count[k];
    }
  }

  return most - least;
};

export const partTwo = (input: string) => {
  const parsed = parseInput(input);
  const { template, rules } = parsed;

  let frequencies: { [key: string]: number } = {};

  for (let i = 0; i < template.length - 1; i += 1) {
    const k = template[i] + template[i + 1];
    frequencies[k] = (frequencies[k] || 0) + 1;
  }

  for (let step = 0; step < 40; step += 1) {
    const newFrequencies = { ...frequencies };
    for (const pair in frequencies) {
      const v = rules[pair];

      const k1 = pair[0] + v;
      const k2 = v + pair[1];
      const occurrences = frequencies[pair] || 0;

      newFrequencies[pair] -= occurrences;
      if (newFrequencies[pair] <= 0) delete newFrequencies[pair];
      newFrequencies[k1] = (newFrequencies[k1] || 0) + occurrences;
      newFrequencies[k2] = (newFrequencies[k2] || 0) + occurrences;
    }

    frequencies = newFrequencies;
  }

  const count: { [key: string]: number } = {};

  for (const pair in frequencies) {
    count[pair[1]] = (count[pair[1]] || 0) + frequencies[pair];
  }

  let most = 0;
  let least = Number.MAX_SAFE_INTEGER;

  for (const k in count) {
    if (count[k] > most) {
      most = count[k];
    }
    if (count[k] < least) {
      least = count[k];
    }
  }

  return most - least;
};
