const a = require('arcsecond');
const { numberWithOptionalFraction } = require('./numberWithOptionalFraction');
const { join } = require("./utils");

const remarks = a.sequenceOf([
    a.str('RMK'),
    a.many1(
        a.takeRight(
            a.whitespace
        )(
            a.choice([
                a.str('AO1').map(() => ({
                    type: 'stationType',
                    description: 'Automated without precipitation sensor',
                })),
                a.str('AO2').map(() => ({
                    type: 'stationType',
                    description: 'Automated with precipitation sensor',
                })),
                a.sequenceOf([
                    a.char('A'),
                    a.exactly(4)(a.digit).map((digits) => parseInt(join(digits), 10)),
                ]).map(([, pressure]) => ({
                    type: 'pressure',
                    pressure: pressure / 100,
                    unit: 'inches',
                })),
                a.sequenceOf([
                    a.choice([
                        a.str('TORNADO'),
                        a.str('FUNNEL CLOUD'),
                        a.str('WATERSPOUT'),
                    ]),
                    a.whitespace,
                    a.anyOfString('BE'),
                    a.possibly(
                        a.exactly(2)(a.digit),
                    ),
                    a.exactly(2)(a.digit),
                    a.possibly(
                        a.sequenceOf([
                            a.whitespace,
                            a.digits,
                            a.whitespace,
                            a.anyOfString('NSWE'),
                            a.possibly(
                                a.anyOfString('NWSW'),
                            ),
                        ]),
                    ),
                    a.possibly(
                        a.sequenceOf([
                            a.whitespace,
                            a.str('MOV'),
                            a.whitespace,
                            a.everythingUntil(
                                a.choice([
                                    a.whitespace,
                                    a.endOfInput,
                                ]),
                            ),
                        ]),
                    ),
                ]),
                a.sequenceOf([
                    a.str('PK WND'),
                    a.whitespace,
                    a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10)),
                    a.sequenceOf([
                        a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
                        a.possibly(
                            a.digit.map((digit) => parseInt(digit, 10)),
                        ),
                    ]).map(([first, last]) => last ? first * 10 + last : first),
                    a.char('/'),
                    a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
                    a.possibly(
                        a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
                    ),
                ]).map(([, , direction, speed, , hoursOrMinutes, minutes]) => ({
                    type: 'peakWind',
                    direction,
                    speed,
                    time: minutes !== null ? `${hoursOrMinutes}:${minutes}` : `${hoursOrMinutes} minutes past the hour`,
                    unit: 'knot',
                })),
                a.takeRight(
                    a.str('SLP')
                )(
                    a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10))
                ).map((slp) => ({
                    type: 'seaLevelPressure',
                    pressure: slp < 100 ? slp / 10 + 1000 : slp / 10 + 900,
                    unit: 'hPa',
                })),
                a.takeRight(
                    a.str('T')
                )(
                    a.sequenceOf([
                        a.exactly(4)(a.digit).map((digits) => parseInt(join(digits), 10)),
                        a.exactly(4)(a.digit).map((digits) => parseInt(join(digits), 10)),
                    ])
                ).map(([temperature, dewpoint]) => ({
                    type: 'temperature',
                    temperature: temperature >= 1000 ? (temperature - 1000) * -0.1 : temperature,
                    dewpoint: dewpoint >= 1000 ? (dewpoint - 1000) * -0.1 : dewpoint,
                    unit: 'celcius',
                })),
                a.takeRight(a.char('P'))(
                    a.exactly(4)(a.digit).map((digits) => parseInt(join(digits), 10))
                ).map((percipitation) => ({
                    type: 'percipitation',
                    percipitation: percipitation / 100,
                    unit: 'inchesPerHour',
                })),
                a.char('$').map(() => ({
                    type: 'maintenanceRequired',
                })),
                a.sequenceOf([
                    a.char('1'),
                    a.anyOfString('01'),
                    a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10)),
                ]).map(([, sign, value]) => ({
                    type: '6HourlyMaximumTemperature',
                    temperature: value * (sign === '1' ? -1 : 1) / 10,
                })),
                // a.sequenceOf([
                //     a.char('2'),
                //     a.anyOfString('01'),
                //     a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10)),
                // ]).map(([, sign, value]) => ({
                //     type: '6HourlyMinumumTemperature',
                //     temperature: value * (sign === '1' ? -1 : 1) / 10,
                // })),
                a.sequenceOf([
                    a.char('4'),
                    a.anyOfString('01'),
                    a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10)),
                    a.anyOfString('01'),
                    a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10)),
                ]).map(([, signMax, max, signMin, min]) => ({
                    type: '24HourMaximumAndMinimumTemperature',
                    minimum: min * (signMin === '1' ? -1 : 1) / 10,
                    maximum: max * (signMax === '1' ? -1 : 1) / 10,
                })),
                a.sequenceOf([
                    a.char('5'),
                    a.digit.map((digit) => parseInt(digit, 10)),
                    a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10)),
                ]).map(([, quantifier, amount]) => ({
                    type: '3HourlyPressureTendancy',
                    quantifier,
                    amount: amount / 10,
                    unit: 'hPa',
                })),
                a.sequenceOf([
                    a.str('SFC VIS'),
                    a.whitespace,
                    numberWithOptionalFraction,
                ]).map(([,, visibility]) => ({
                    type: 'surfaceVisibility',
                    visibility,
                })),
                a.everyCharUntil(
                    a.choice([
                        a.whitespace,
                        a.endOfInput,
                    ])
                ).map((value) => ({
                    type: 'unknown',
                    source: value,
                })),
            ])
        )
    ),
]).map(([, remarks]) => ({
    type: 'remarks',
    remarks,
}));
exports.remarks = remarks;
