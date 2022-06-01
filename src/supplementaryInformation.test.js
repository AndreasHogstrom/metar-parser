const { supplementaryInformation, windShear, seaSurfaceTemperatureAndStateOfTheSea } = require('./supplementaryInformation');

test.each([
    ['REFZRA'],
    ['RETSRA'],
    ['WS R03'],
    ['WS ALL RWY'],
    ['WS R18C'],
    ['W15/S2'],
    ['REFZRA WS R03'],
    ['REFZRA W15/S2'],
    ['REFZRA WS R03 W15/S2'],
])('%s', (input) => {
    const result = supplementaryInformation.run(input);

    expect(result.isError).toBe(false);
    expect(result.index).toEqual(input.length);
    //expect(result.result).toEqual(expected);
});

test.each([
    ['WS R03'],
    ['WS ALL RWY'],
    ['WS R18C'],
])('%s', (input) => {
    const result = windShear.run(input);

    expect(result.isError).toBe(false);
    expect(result.index).toEqual(input.length);
    //expect(result.result).toEqual(expected);
});

test.each([
    ['WS R03'],
    ['WS ALL RWY'],
    ['WS R18C'],
])('%s', (input) => {
    const result = windShear.run(input);

    expect(result.isError).toBe(false);
    expect(result.index).toEqual(input.length);
    //expect(result.result).toEqual(expected);
});

test.each([
    ['W15/S2'],
])('%s', (input) => {
    const result = seaSurfaceTemperatureAndStateOfTheSea.run(input);

    expect(result.isError).toBe(false);
    expect(result.index).toEqual(input.length);
    //expect(result.result).toEqual(expected);
});