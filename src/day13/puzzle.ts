interface Dot {
  x: number;
  y: number;
}

interface Fold {
  direction: 'x' | 'y';
  position: number;
}

const grid = (dots: Dot[]) => {
  let print = '';
  let [maxX, maxY] = [0, 0];

  for (const dot of dots) {
    if (dot.x > maxX) maxX = dot.x;
    if (dot.y > maxY) maxY = dot.y;
  }

  for (let y = 0; y <= maxY; y += 1) {
    for (let x = 0; x <= maxX; x += 1) {
      if (dots.find((d) => d.x === x && d.y === y)) {
        print += '#';
      } else {
        print += '.';
      }
    }
    print += '\n';
  }

  return print.trim();
};

const parseInput = (input: string) => {
  const lines = input.split('\n');
  const dots: Dot[] = [];
  const folds: Fold[] = [];

  let isFold = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line == '') {
      isFold = true;
      continue;
    }

    if (!isFold) {
      const [x, y] = line.split(',').map((v) => parseInt(v, 10));
      dots.push({ x, y });
    } else {
      const [direction, position] = [line[11], line.slice(13)] as [
        'x' | 'y',
        string
      ];
      folds.push({ direction, position: parseInt(position, 10) });
    }
  }

  return { dots, folds };
};

export const partOne = (input: string) => {
  const { dots, folds } = parseInput(input);

  const { direction, position } = folds[0];

  for (const dot of dots) {
    if (dot[direction] >= position) {
      dot[direction] = position - (dot[direction] - position);
    }
  }

  return new Set(dots.map((d) => `${d.x},${d.y}`)).size;
};

export const partTwo = (input: string) => {
  const { dots, folds } = parseInput(input);

  for (const fold of folds) {
    const { direction, position } = fold;

    for (const dot of dots) {
      if (dot[direction] >= position) {
        dot[direction] = position - (dot[direction] - position);
      }
    }
  }

  return grid(dots);
};
