import * as fs from 'fs';
import * as path from 'path';
import { partOne, partTwo } from './day01/puzzle';
import { runPuzzle } from './utils';

// import { partOne, partTwo } from './day13/puzzle';

const input = fs
  .readFileSync(path.join(__dirname, './day01/input.txt'))
  .toString();

runPuzzle(1, 'one', () => partOne(input));
runPuzzle(1, 'two', () => partTwo(input));
