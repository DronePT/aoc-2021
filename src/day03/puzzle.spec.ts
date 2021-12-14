import { partOne, partTwo } from './puzzle';

describe('day 03', () => {
  test('Part One', () => {
    expect(
      partOne(`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`)
    ).toEqual(198);
  });

  test('Part Two', () => {
    expect(
      partTwo(`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`)
    ).toEqual(230);
  });
});
