import { partOne, partTwo } from './puzzle';

describe('day 01', () => {
  test('Part One', () => {
    expect(
      partOne(`199
200
208
210
200
207
240
269
260
263`)
    ).toEqual(7);
  });

  test('Part Two', () => {
    expect(
      partTwo(`199
200
208
210
200
207
240
269
260
263`)
    ).toEqual(5);
  });
});
