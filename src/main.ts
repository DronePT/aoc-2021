import * as fs from 'fs';
import * as path from 'path';
import { partOne, partTwo } from './day03/puzzle';
import { runPuzzle } from './utils';

// import { partOne, partTwo } from './day13/puzzle';

const input = fs
  .readFileSync(path.join(__dirname, './day03/input.txt'))
  .toString();

runPuzzle(3, 'one', () => partOne(input));
runPuzzle(3, 'two', () => partTwo(input));
