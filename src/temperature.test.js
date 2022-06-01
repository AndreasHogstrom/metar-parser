const { temperature } = require('./temperature');

test.each([
    ['05/05', { type: 'temperature', temperature: 5, dewpoint: 5 }],
    ['05/M05', { type: 'temperature', temperature: 5, dewpoint: -5 }],
    ['M05/M05', { type: 'temperature', temperature: -5, dewpoint: -5 }],
    ['M05/05', { type: 'temperature', temperature: -5, dewpoint: 5 }],
])('%s', (input, expected) => {
    const result = temperature.run(input);

    expect(result.isError).toBe(false);
    expect(result.index).toBe(input.length);
    expect(result.result).toEqual(expected);
});
