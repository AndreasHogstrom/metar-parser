const a = require('arcsecond');
const { join } = require("./utils");

const wind = a.sequenceOf([
    a.choice([
        a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10)),
        a.str('VRB'),
        a.str('///'),
    ]),
    a.choice([
        a.sequenceOf([
            // TODO: What does P mean? "More than?"
            a.possibly(
                a.char('P')
            ),
            a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
            a.possibly(a.digit),
        ]).map(([p, digits1, digit2]) => digit2 ? digits1 * 10 + parseInt(digit2, 10) : digits1),
        a.str('//'),
    ]),
    a.possibly(
        a.sequenceOf([
            a.char('G'),
            a.possibly(
                a.char('P')
            ),
            a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
            a.possibly(a.digit),
        ]).map(([, , digits1, digit2]) => digit2 ? digits1 * 10 + parseInt(digit2, 10) : digits1)
    ),
    a.choice([
        a.str('MPS').map(() => 'meterPerSecond'),
        a.str('KT').map(() => 'knot'),
    ]),
    a.possibly(
        a.sequenceOf([
            a.whitespace,
            a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10)),
            a.char('V'),
            a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10)),
        ]).map(([, from, , to]) => ([from, to]))
    ),
]).map(([direction, speed, gusts, unit, directionVariation]) => ({
    type: 'wind',
    direction,
    directionVariation,
    speed,
    gusts,
    unit,
}));
exports.wind = wind;
