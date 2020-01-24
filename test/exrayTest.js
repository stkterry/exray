const expect = require("chai").expect;
const Exray = require("../lib/exray.js");

describe('pluck', () => {
  it("should pluck values using the 'name' prop", () => {
    const users = new Exray(
      { name: 'Stinky Pete' },
      { name: 'Heckus Redeckus' }
    )

    const names = users.pluck('name')
    expect(names).to.deep.equal(['Stinky Pete', 'Heckus Redeckus'])
  })
});

describe('times', () => {
  it("should return an array containing the indices 0 and 1", () => {
    const numbers = Exray.times(2, i => i);
    expect(numbers).to.deep.equal([0, 1]);
  })
})

describe('tapping and piping', () => {
  it("should execute callback one time", () => {
    let i = 0;
    new Exray(1, 2, 3).tap(arr => i = i + 1);
    expect(i).to.equal(1);
  });

  it("should return original array when tapping", () => {
    const exray = new Exray(1, 2, 3).tap(() => 10);
    expect(exray).to.deep.equal([1, 2, 3]);
  });

  it("should return result of pipe", () => {
    const piped = new Exray(1, 2, 3).pipe(array => array.length);
    expect(piped).to.equal(3);
  })
});

describe("mod", () => {
  it("should take in a function and modify the array in place", () => {
    const exray = new Exray(1, 2, 3);
    exray.mod(el => el * 2);
    expect(exray).to.deep.equal([2, 4, 6])
  })

  it("should optionally evaluate using index", () => {
    const exray = new Exray(1, 2, 3);
    exray.mod((el, idx) => el * idx);
    expect(exray).to.deep.equal([0, 2, 6])  
  })
})

describe('groupBy', () => {
  it("should hashMap", () => {
    const users = new Exray(
      { name: 'Stinky Pete', group: 1 },
      { name: "Heckus Redeckus", group: 1 },
      { name: "Hecktor Correcktor", group: 2 }
    );

    const userMap = users.groupBy('group');

    expect(userMap).to.deep.equal({
      '1': [
        { name: 'Stinky Pete', group: 1 },
        { name: 'Heckus Redeckus', group: 1 },
      ],
      '2': [
        { name: 'Hecktor Correcktor', group: 2 },
      ]
    });
  });

  it("should hashMap using Exray array", () => {
    const users = new Exray(
      { name: 'Stinky Pete', group: 1 },
      { name: "Heckus Redeckus", group: 1 },
      { name: "Hecktor Correcktor", group: 2 }
    );
    const userMap = users.groupBy('group');
    const groupOne = userMap['1'];
    const isInstanceOfStray = (groupOne instanceof Exray);
    expect(isInstanceOfStray).to.be.true;
  })
});

describe("split", () => {
  it ("should split array into multiple chunks", () => {
    const exray = new Exray(1, 2, 3, 4);

    const splits = exray.split(2);
    expect(splits).to.deep.equal([ [1, 2], [3, 4] ]);
  })
});

describe("prepend", () => {
  it ("should insert elements to the front of the array", () => {
    const exray = new Exray(3, 4);
    const modified = exray.prepend(1, 2);
    expect(modified).to.deep.equal([1, 2, 3, 4]);
  })
});

describe("dedup", () => {
  it ("should return an array of unique values", () => {
    const exray = new Exray(1, 2, 2, 5, 7, 5, 3);
    const uniques = exray.unique();
    expect(uniques).to.deep.equal([1, 2, 5, 7, 3]);
  })

  it ("should take an optional filter function", () => {
    const exray = new Exray(1, 2, 2, 5, 7, 5, 3);
    const uniques = exray.unique(el => el > 2);
    expect(uniques).to.deep.equal([5, 7, 3]);
  })
});

describe("pad", () => {
  it ("should return a padded array", () => {
    const exray = new Exray(1, 2, 3);
    const padded = exray.pad(2);

    expect(padded).to.deep.equal([0, 0, 1, 2, 3]);
  })
})