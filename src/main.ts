import * as fs from 'fs';
import * as path from 'path';

import { partOne, partTwo } from './day13/day13';

const input = fs
  .readFileSync(path.join(__dirname, './day13/day13.txt'))
  .toString();

console.warn('part one:');
console.warn(partOne(input));
console.warn('part two:');
console.warn(partTwo(input));
