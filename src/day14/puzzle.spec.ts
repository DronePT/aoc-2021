import { partOne, partTwo } from './puzzle';

describe('day 14', () => {
  test('Part One', () => {
    expect(
      partOne(`NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`)
    ).toEqual(1588);
  });

  test('Part Two', () => {
    expect(
      partTwo(`NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`)
    ).toEqual(2188189693529);
  });
});
