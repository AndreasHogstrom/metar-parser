const { rvr, rvrMany1 } = require('./rvr');

test.each([
    ['R04/1900'],
    ['R04L/1900'],
    ['R04C/1900'],
    ['R04R/1900'],
    ['R04/P1900'],
    ['R04/M1900'],
    ['R04/1900U'],
    ['R04/1900D'],
    ['R04/1900N'],
    ['R04/1900V0800'],
    ['R04/1900VP0800'],
    ['R04/1900VM0800'],
    ['R04/1900V0800U'],
    ['R04/1900V0800D'],
    ['R04/1900V0800N'],
    ['R04/1900V0800FT'],
    ['R04/1900V0800NFT'],
    ['R19R/////'],
])('%s', (input) => {
    const result = rvr.run(input);

    expect(result.isError).toBe(false);
    expect(result.index).toBe(input.length);
    //expect(result.result).toEqual(expected);
});

test.each([
    ['R04L/1900N'],
    ['R04L/1900N R15/1700D'],
    ['R04L/1900N R15/1700D R22L/1900D'],
])('%s', (input) => {
    const result = rvrMany1.run(input);

    expect(result.isError).toBe(false);
    expect(result.index).toBe(input.length);
    //expect(result.result).toEqual(expected);
});
