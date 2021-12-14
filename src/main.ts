import * as fs from 'fs';
import * as path from 'path';

import { partOne, partTwo } from './day13/puzzle';

const input = fs
  .readFileSync(path.join(__dirname, './day13/input.txt'))
  .toString();

console.warn('part one:');
console.warn(partOne(input));
console.warn('part two:');
console.warn(partTwo(input));
