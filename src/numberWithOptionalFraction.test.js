const { numberWithOptionalFraction } = require('./numberWithOptionalFraction');


test.each([
    ['3'],
    ['3/9'],
    ['2 3/9'],
    ['12 5/16'],
])('%s', (input) => {
    const result = numberWithOptionalFraction.run(input);
    expect(result.isError).toBe(false);
    expect(result.index).toBe(input.length);
});
