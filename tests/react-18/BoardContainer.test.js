import Lh from '../../src/helpers/LaneHelper';

describe('BoardContainer', () => {
  test('lifecycle', () => {
    const expected = require('../../stories/data/base.json');
    const data = require('../../stories/data/base.json');

    let state = {};

    state = Lh.initialiseLanes(state, data);
    expect(data).toStrictEqual(expected);

    state = Lh.deinitialiseLanes(state, data);
    expect(data).toStrictEqual(expected);

    expect(state).toStrictEqual(expected);
  });
});
