const { pressure } = require('./pressure');

test.each([
    ['Q1015', { type: 'pressure', pressure: 1015, unit: 'hPa' }],
    ['A2992', { type: 'pressure', pressure: 29.92, unit: 'inches' }],
])('%s', (input, expected) => {
    const result = pressure.run(input);

    expect(result.isError).toBe(false);
    expect(result.index).toBe(input.length);
    expect(result.result).toEqual(expected);
});
