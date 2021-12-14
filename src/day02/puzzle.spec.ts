import { partOne, partTwo } from './puzzle';

describe('day 01', () => {
  test('Part One', () => {
    expect(
      partOne(`forward 5
down 5
forward 8
up 3
down 8
forward 2`)
    ).toEqual(150);
  });

  test('Part Two', () => {
    expect(
      partTwo(`forward 5
down 5
forward 8
up 3
down 8
forward 2`)
    ).toEqual(900);
  });
});
