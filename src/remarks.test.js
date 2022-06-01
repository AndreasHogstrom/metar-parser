const { remarks } = require('./remarks');

test.each([
    ['RMK TORNADO B13 6 NE MOV UNKN'],
])('%s', (input) => {
    const result = remarks.run(input);

    expect(result.isError).toEqual(false);
    expect(result.index).toEqual(input.length);
});


test.each([
    ['RMK 11001', { type: '6HourlyMaximumTemperature', temperature: -0.1 }],
    ['RMK 10142', { type: '6HourlyMaximumTemperature', temperature: 14.2 }],

    ['RMK 21021', { type: '6HourlyMinumumTemperature', temperature: -2.1 }],
    ['RMK 20012', { type: '6HourlyMinumumTemperature', temperature: 1.2 }],

    ['RMK 401001015', { type: '24HourMaximumAndMinimumTemperature', minimum: -1.5, maximum: 10 }],
    ['RMK 411001015', { type: '24HourMaximumAndMinimumTemperature', minimum: -1.5, maximum: -10 }],
    ['RMK 411000015', { type: '24HourMaximumAndMinimumTemperature', minimum: 1.5, maximum: -10 }],

    ['RMK 52032', { type: '3HourlyPressureTendancy', quantifier: 2, amount: 3.2, unit: 'hPa' }],

    ['RMK PK WND 28045/15', { type: 'peakWind', direction: 280, speed: 45, unit: 'knot', time: '15 minutes past the hour'} ],
])('%s', (input, expected) => {
    const result = remarks.run(input);

    expect(result.isError).toEqual(false);
    expect(result.index).toEqual(input.length);
    expect(result.result).toEqual({ type: 'remarks', remarks: [expected] });
});
