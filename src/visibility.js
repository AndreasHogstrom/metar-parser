const a = require('arcsecond');
const { join } = require("./utils");

const visibility = a.choice([
    // ICAO
    a.sequenceOf([
        a.exactly(4)(a.digit).map((digits) => parseInt(join(digits), 10)),
        a.possibly(
            a.sequenceOf([
                a.whitespace,
                a.exactly(4)(a.digit).map((digits) => parseInt(join(digits), 10)),
                a.possibly(
                    a.choice([
                        a.str('N'),
                        a.str('NE'),
                        a.str('E'),
                        a.str('SE'),
                        a.str('S'),
                        a.str('SW'),
                        a.str('W'),
                        a.str('NW'),
                    ])
                ),
            ])
        ),
    ]).map(([visibility, directionalVisibility]) => ({
        type: 'visibility',
        visibility: visibility,
        directionalVisibility: directionalVisibility !== null ? {
            direction: directionalVisibility[2],
            visibility: directionalVisibility[1],
        } : null,
        unit: 'meter',
    })),
    // FAA
    a.sequenceOf([
        a.possibly(a.char('M')),
        a.possibly(
            a.takeLeft(
                a.digit.map((digit) => parseInt(digit, 10)),
            )(
                a.whitespace,
            ),
        ).map((value) => value ?? 0),
        a.choice([
            a.sequenceOf([
                a.digit.map((digit) => parseInt(digit, 10)),
                a.char('/'),
                a.digit.map((digit) => parseInt(digit, 10)),
            ]).map(([numerator, _, denominator]) => numerator / denominator),
            a.digits.map((digits) => parseInt(digits, 10)),
        ]),
        a.str('SM'),
    ]).map(([marker, whole, decimal]) => ({
        type: 'visibility',
        visibility: whole + decimal,
        unit: 'statenMile',
    })),
]);
exports.visibility = visibility;
