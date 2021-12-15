interface Point {
  x: number;
  y: number;
}

interface ParsedInput {
  lines: Point[][];
  maxX: number;
  maxY: number;
}

const parseInput = (input: string): ParsedInput => {
  let maxX = 0;
  let maxY = 0;

  const lines = input
    .trim()
    .split('\n')
    .map((l) =>
      l.split(' -> ').map((l) => {
        const ls = l.split(',');
        const x = parseInt(ls[0], 10);
        const y = parseInt(ls[1], 10);

        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;

        return { x, y };
      })
    );

  return {
    lines,
    maxX,
    maxY,
  };
};

export const display = (matrix: number[][]) => {
  console.log('');
  console.log(
    matrix
      .map((r) => r.join(''))
      .join('\n')
      .replace(/0/gi, '.')
  );
  console.log('');
};

const getOverlapCount = (
  matrix: number[][],
  lines: Point[][],
  useDiagonal = false
) => {
  const count: { [key: string]: number } = {};
  for (const line of lines) {
    const [start, end] = line;

    // consider only vertical & horizontal lines
    if (!useDiagonal && start.x !== end.x && start.y !== end.y) {
      continue;
    }

    const dx = end.x > start.x ? 1 : -1;
    const dy = end.y > start.y ? 1 : -1;
    let xDiff = Math.abs(start.x - end.x);
    let yDiff = Math.abs(start.y - end.y);

    while (xDiff > -1 || yDiff > -1) {
      const mx = start.x + Math.max(xDiff, 0) * dx;
      const my = start.y + Math.max(yDiff, 0) * dy;

      matrix[my][mx] += 1;
      if (matrix[my][mx] > 1) count[`${mx},${my}`] = matrix[my][mx];

      xDiff -= 1;
      yDiff -= 1;
    }
  }

  return Object.keys(count).length;
};

export const partOne = (input: string) => {
  const { lines, maxX, maxY } = parseInput(input);

  const matrix = new Array(maxY + 1)
    .fill(null)
    .map(() => new Array(maxX + 1).fill(0));

  return getOverlapCount(matrix, lines);
};

export const partTwo = (input: string) => {
  const { lines, maxX, maxY } = parseInput(input);

  const matrix = new Array(maxY + 1)
    .fill(null)
    .map(() => new Array(maxX + 1).fill(0));

  return getOverlapCount(matrix, lines, true);
};
