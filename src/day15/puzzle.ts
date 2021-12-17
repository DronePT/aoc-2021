import { createTimer } from '../utils';

class Node {
  neighbors: Node[] = [];
  cameFrom?: Node;
  cost = 0;

  constructor(private x: number, private y: number, public risk: number) {}

  copy() {
    const n = new Node(this.x, this.y, this.risk);

    n.neighbors = this.neighbors;
    n.cost = this.cost;
    n.cameFrom = this.cameFrom;

    return n;
  }

  get hash() {
    const { x, y } = this;
    return `${x}_${y}`;
  }

  setCameFrom(node: Node) {
    this.cameFrom = node;
  }

  setCost() {
    this.cost = (this.cameFrom?.cost ?? 0) + this.risk;
  }

  costTo(node: Node) {
    return this.getCost() + node.risk;
  }

  getCost() {
    return this.cost;
  }

  isEqual(n?: Node) {
    if (!n) return false;

    return this.x === n.x && this.y === n.y;
  }

  addNeighbor(x: number, y: number, grid: Node[][]) {
    if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
      this.neighbors.push(grid[y][x]);
    }

    return this;
  }
}

const expand = (n: number): number => {
  const r = n + 1;
  return r > 9 ? r - 9 : r;
};

const expandHorizontal = (line: string) => {
  const lines = [line];
  let lastLine = line.split('').map((l) => parseInt(l, 10));

  for (let i = 1; i < 5; i += 1) {
    const newLine: number[] = [];

    for (const l of lastLine) {
      newLine.push(expand(l));
    }

    lastLine = newLine;
    lines.push(newLine.join(''));
  }

  return lines.join('');
};

const parseInput = (input: string, expandGrid = false) => {
  let lines = input.split('\n');

  if (expandGrid) {
    const h = lines.map((line) => expandHorizontal(line));

    for (let i = 0; i < lines.length * 4; i += 1) {
      h.push(
        h[i]
          .split('')
          .map((n) => expand(parseInt(n, 10)))
          .join('')
      );
    }

    lines = h;
  }

  const sizeX = lines[0].length;
  const sizeY = lines.length;

  const grid = lines.map((r, y) =>
    r.split('').map((v, x) => {
      const node = new Node(x, y, parseInt(v, 10));

      return node;
    })
  );

  for (let y = 0; y < sizeY; y += 1) {
    for (let x = 0; x < sizeX; x += 1) {
      const node = grid[y][x];

      node
        .addNeighbor(x - 1, y, grid)
        .addNeighbor(x + 1, y, grid)
        .addNeighbor(x, y - 1, grid)
        .addNeighbor(x, y + 1, grid);
    }
  }

  return { grid, sizeX, sizeY };
};

const leastNodeOnOpen = (open: Node[]): Node => {
  const leastIndex = open.reduce((acc, node, i, open) => {
    if (acc < 0 || node.cost < open[acc].cost) {
      return i;
    }

    return acc;
  }, -1);

  const [node] = open.splice(leastIndex, 1);

  return node;
};

const aStar = (grid: Node[][], startNode: Node, goal: Node) => {
  const open = [startNode];
  const gScore: { [key: string]: number } = {
    [startNode.hash]: startNode.getCost(),
  };

  let final: Node = startNode;

  while (open.length) {
    const current = leastNodeOnOpen(open);

    if (current.isEqual(goal)) {
      final = current;
      break;
    }

    for (const n of current.neighbors) {
      const neighbor = n.copy();

      if (neighbor.isEqual(current.cameFrom)) continue;

      if (
        !gScore[neighbor.hash] ||
        current.costTo(neighbor) < gScore[neighbor.hash]
      ) {
        neighbor.setCameFrom(current);
        neighbor.setCost();

        gScore[neighbor.hash] = neighbor.getCost();

        if (!open.find((o) => o.hash === neighbor.hash)) {
          open.push(neighbor);
        }
      }
    }
  }

  return final.cost ?? -1;
};

export const partOne = (input: string) => {
  const timer = createTimer();
  const { grid, sizeX, sizeY } = parseInput(input);
  timer.print('build-grid');

  const startNode = grid[0][0].copy();
  const goal = grid[sizeY - 1][sizeX - 1];

  return aStar(grid, startNode, goal);
};

export const partTwo = (input: string) => {
  const timer = createTimer();
  const { grid, sizeX, sizeY } = parseInput(input, true);
  timer.print('build-grid');

  const startNode = grid[0][0].copy();
  const goal = grid[sizeY - 1][sizeX - 1];

  return aStar(grid, startNode, goal);
};
