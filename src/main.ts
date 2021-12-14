import * as fs from 'fs';
import * as path from 'path';
import { partOne, partTwo } from './day02/puzzle';
import { runPuzzle } from './utils';

// import { partOne, partTwo } from './day13/puzzle';

const input = fs
  .readFileSync(path.join(__dirname, './day02/input.txt'))
  .toString();

runPuzzle(2, 'one', () => partOne(input));
runPuzzle(2, 'two', () => partTwo(input));
