const a = require('arcsecond');
const { join } = require("./utils");

const rvr = a.sequenceOf([
    a.char('R'),
    a.sequenceOf([
        a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
        a.possibly(
            a.choice([
                a.char('L'),
                a.char('C'),
                a.char('R'),
            ])
        ),
    ]).map(([runway, marker]) => `${runway.toString().padStart(2, '0')}${marker}`),
    a.char('/'),
    a.possibly(
        a.choice([
            a.char('P'),
            a.char('M'),
        ])
    ),
    a.choice([
        a.exactly(4)(a.digit).map((digits) => parseInt(join(digits), 10)),
        a.str('////').map(() => 'unknown'),
    ]),
    a.possibly(
        a.sequenceOf([
            a.char('V'),
            a.possibly(
                a.choice([
                    a.char('P'),
                    a.char('M'),
                ])
            ),
            a.exactly(4)(a.digit).map((digits) => parseInt(join(digits), 10)),
        ]),
    ),
    a.possibly(
        a.choice([
            a.char('U').map(() => 'upward'),
            a.char('D').map(() => 'downward'),
            a.char('N').map(() => 'none'),
        ])
    ),
    a.possibly(
        a.str('FT')
    ),
]).map(([, runway, , marker, range, variation, pastTendency, unit]) => ({
    type: 'runwayVisualRange',
    runway,
    range: [marker === 'P' ? 'moreThan' : marker === 'M' ? 'lessThan' : 'equal', range],
    variation: variation ? [variation[1] === 'P' ? 'moreThan' : variation[1] === 'M' ? 'lessThan' : 'equal', variation[2]] : null,
    pastTendency,
    unit: unit === 'FT' ? 'feet' : 'meter',
}));
exports.rvr = rvr;

const rvrMany1 = a.sequenceOf([
    rvr,
    a.many(
        a.takeRight(
            a.whitespace,
        )(
            rvr,
        ),
    ),
]).map(([head, rest]) => [head, ...rest]);
exports.rvrMany1 = rvrMany1;
