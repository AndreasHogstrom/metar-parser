const { visibility } = require('./visibility');

test.each([
    ['4000', { type: 'visibility', visibility: 4000, directionalVisibility: null, unit: 'meter' }],
    ['4000 2000', { type: 'visibility', visibility: 4000, directionalVisibility: { direction: null, visibility: 2000 }, unit: 'meter' }],
    ['4000 2000N', { type: 'visibility', visibility: 4000, directionalVisibility: { direction: 'N', visibility: 2000 }, unit: 'meter' }],
    ['3SM', { type: 'visibility', visibility: 3, unit: 'statenMile' }],
    ['1/2SM', { type: 'visibility', visibility: 0.5, unit: 'statenMile' }],
    ['2 1/2SM', { type: 'visibility', visibility: 2.5, unit: 'statenMile' }],
    ['M1/4SM', { type: 'visibility', visibility: 0.25, unit: 'statenMile' }],
])('%s', (input, expected) => {
    const result = visibility.run(input);

    expect(result.isError).toBe(false);
    expect(result.index).toBe(input.length);
    expect(result.result).toEqual(expected);
});
