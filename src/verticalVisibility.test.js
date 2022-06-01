const { verticalVisibility } = require('./verticalVisibility');

test.each([
    ['VV123', { type: 'verticalVisibility', visibility: 12300, unit: 'feet' }],
    ['VV005', { type: 'verticalVisibility', visibility: 500, unit: 'feet' }],
])('%s', (input, expected) => {
    const result = verticalVisibility.run(input);

    expect(result.isError).toBe(false);
    expect(result.index).toBe(input.length);
    expect(result.result).toEqual(expected);
});
