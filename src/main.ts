import * as fs from 'fs';
import * as path from 'path';
import { partOne, partTwo } from './day05/puzzle';
import { runPuzzle } from './utils';

// import { partOne, partTwo } from './day13/puzzle';

const input = fs
  .readFileSync(path.join(__dirname, './day05/input.txt'))
  .toString();

runPuzzle(5, 'one', () => partOne(input));
console.warn('\n', '########'.repeat(8), '\n');
runPuzzle(5, 'two', () => partTwo(input));
