import * as fs from 'fs';
import * as path from 'path';
import { partOne, partTwo } from './day15/puzzle';
import { runPuzzle } from './utils';

// import { partOne, partTwo } from './day13/puzzle';

const input = fs
  .readFileSync(path.join(__dirname, './day15/input.txt'))
  .toString();

runPuzzle(15, 'one', () => partOne(input));
console.warn('\n', '########'.repeat(8), '\n');
runPuzzle(15, 'two', () => partTwo(input));
