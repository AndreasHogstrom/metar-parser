const a = require('arcsecond');
const { join } = require("./utils");

const temperature = a.sequenceOf([
    a.sequenceOf([
        a.possibly(a.char('M')),
        a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
    ]).map(([sign, value]) => sign === 'M' ? -value : value),
    a.char('/'),
    a.sequenceOf([
        a.possibly(a.char('M')),
        a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
    ]).map(([sign, value]) => sign === 'M' ? -value : value),
]).map(([temperature, , dewpoint]) => ({
    type: 'temperature',
    temperature,
    dewpoint,
}));
exports.temperature = temperature;
