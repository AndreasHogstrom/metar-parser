const a = require('arcsecond');
const { join } = require('./utils');


const numberWithOptionalFraction = a.choice([
    a.sequenceOf([
        a.digit.map((digit) => parseInt(digit, 10)),
        a.char('/'),
        a.digits.map((digits) => parseInt(digits, 10)),
    ]).map(([numerator, , denominator]) => numerator / denominator),
    a.sequenceOf([
        a.digits.map((digits) => parseInt(digits, 10)),
        a.possibly(
            a.sequenceOf([
                a.whitespace,
                a.digit.map((digit) => parseInt(digit, 10)),
                a.char('/'),
                a.digits.map((digits) => parseInt(digits, 10)),
            ]).map(([, numerator, , denominator]) => numerator / denominator),
        ).map((value) => value ?? 0),
    ]).map(([integer, decimal]) => integer + decimal),
]);

exports.numberWithOptionalFraction = numberWithOptionalFraction;