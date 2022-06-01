const { wind } = require('./wind');

test.each([
    ['12305KT', { type: 'wind', direction: 123, speed: 5, unit: 'knot', directionVariation: null, gusts: null }],
    ['12305MPS', { type: 'wind', direction: 123, speed: 5, unit: 'meterPerSecond', directionVariation: null, gusts: null }],
    ['123123MPS', { type: 'wind', direction: 123, speed: 123, unit: 'meterPerSecond', directionVariation: null, gusts: null }],
    ['123P32KT', { type: 'wind', direction: 123, speed: 32, unit: 'knot', directionVariation: null, gusts: null }],
    ['10010G25KT', { type: 'wind', direction: 100, speed: 10, unit: 'knot', directionVariation: null, gusts: 25 }],
    ['100120G150MPS', { type: 'wind', direction: 100, speed: 120, unit: 'meterPerSecond', directionVariation: null, gusts: 150 }],
    ['10010GP20KT', { type: 'wind', direction: 100, speed: 10, unit: 'knot', directionVariation: null, gusts: 20 }],
    ['12305KT 090V140', { type: 'wind', direction: 123, speed: 5, unit: 'knot', directionVariation: [90, 140], gusts: null }],
    ['100120G150MPS 080V120', { type: 'wind', direction: 100, speed: 120, unit: 'meterPerSecond', directionVariation: [80, 120], gusts: 150 }],
    ['/////KT', { type: 'wind', direction: '///', speed: '//', unit: 'knot', directionVariation: null, gusts: null }],
])('%s', (input, expected) => {
    const result = wind.run(input);

    expect(result.isError).toBe(false);
    expect(result.index).toBe(input.length);
    expect(result.result).toEqual(expected);
});
