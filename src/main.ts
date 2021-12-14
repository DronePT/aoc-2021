import * as fs from 'fs';
import * as path from 'path';
import { partOne, partTwo } from './day14/puzzle';
import { runPuzzle } from './utils';

// import { partOne, partTwo } from './day13/puzzle';

const input = fs
  .readFileSync(path.join(__dirname, './day14/input.txt'))
  .toString();

runPuzzle(14, 'one', () => partOne(input));
runPuzzle(14, 'two', () => partTwo(input));
