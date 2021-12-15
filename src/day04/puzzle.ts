const parseInput = (input: string) => {
  const lines = input.split('\n\n');
  const [numbers, ...boardsRaw] = lines;

  return {
    numbers: numbers.split(',').map(Number),
    boards: boardsRaw.map((b) =>
      b.split('\n').map((n) =>
        n
          .trim()
          .split(' ')
          .filter((v) => !!v)
          .map((v) => parseInt(v, 10))
      )
    ),
  };
};

export const partOne = (input: string) => {
  const inp = parseInput(input);

  const { numbers, boards } = inp;

  const drawn = numbers.splice(0, 4);

  const sizeX = boards[0][0].length;
  const sizeY = boards[0].length;

  let winningBoard = -1;
  while (numbers.length) {
    if (winningBoard > -1) break;
    const n = numbers.shift() as number;
    drawn.push(n);

    for (const b in boards) {
      if (winningBoard > -1) break;

      for (let y = 0; y < sizeY; y += 1) {
        if (winningBoard > -1) break;

        const row = [];

        for (let x = 0; x < sizeX; x += 1) {
          if (winningBoard > -1) break;

          row.push(boards[b][y][x]);

          if (y === 0) {
            const col = [];
            for (let i = 0; i < sizeY; i += 1) {
              col.push(boards[b][i][x]);
            }

            if (col.every((n) => drawn.includes(n))) {
              winningBoard = parseInt(b, 10);
              break;
            }
          }
        }

        if (row.every((n) => drawn.includes(n))) {
          winningBoard = parseInt(b, 10);
          break;
        }
      }
    }
  }

  let sum = 0;

  for (let y = 0; y < sizeY; y += 1) {
    for (let x = 0; x < sizeX; x += 1) {
      const n = boards[winningBoard][y][x];
      if (!drawn.includes(n)) {
        sum += n;
      }
    }
  }

  return sum * drawn[drawn.length - 1];
};

export const partTwo = (input: string) => {
  const inp = parseInput(input);

  const { numbers, boards } = inp;

  const drawn = numbers.splice(0, 4);

  const sizeX = boards[0][0].length;
  const sizeY = boards[0].length;

  const winningBoard: number[] = [];
  const wins = [];

  while (numbers.length) {
    // if (wins >= 2) break;

    const n = numbers.shift() as number;
    drawn.push(n);

    for (const b in boards) {
      // if (wins >= 2) break;
      const boardIndex = parseInt(b, 10);
      if (winningBoard.includes(boardIndex)) {
        continue;
      }

      for (let y = 0; y < sizeY; y += 1) {
        const row = [];

        for (let x = 0; x < sizeX; x += 1) {
          row.push(boards[b][y][x]);

          if (y === 0) {
            const col = [];
            for (let i = 0; i < sizeY; i += 1) {
              col.push(boards[b][i][x]);
            }

            if (col.every((n) => drawn.includes(n))) {
              winningBoard.push(boardIndex);
              wins.push({
                col,
                drawn: [...drawn],
                board: boardIndex,
              });
              break;
            }
          }
        }

        if (row.every((n) => drawn.includes(n))) {
          winningBoard.push(boardIndex);
          wins.push({
            row,
            drawn: [...drawn],
            board: boardIndex,
          });
          break;
        }
      }
    }
  }

  let sum = 0;

  const lastWin = wins[wins.length - 1];

  for (let y = 0; y < sizeY; y += 1) {
    for (let x = 0; x < sizeX; x += 1) {
      const n = boards[lastWin.board][y][x];
      if (!lastWin.drawn.includes(n)) {
        sum += n;
      }
    }
  }

  return sum * drawn[lastWin.drawn.length - 1];
};
