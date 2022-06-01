const { weather, weatherMany1 } = require('./weather');

test.each([
    ['SQ'],
    ['FG'],
    ['SN'],
    ['RASN'],
    ['+SQ'],
    ['+FG'],
    ['+RASN'],
    ['VCBLSN'],
    ['-PL'],
    ['VCTS'],
])('%s', (input) => {
    const result = weather.run(input);

    expect(result.isError).toEqual(false);
    expect(result.index).toEqual(input.length);
    //expect(result.result).toEqual(expected);
});

test.each([
    ['+SN RA'],
])('%s', (input) => {
    const result = weatherMany1.run(input);

    expect(result.isError).toEqual(false);
    expect(result.index).toEqual(input.length);
});
