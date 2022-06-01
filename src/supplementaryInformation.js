const a = require('arcsecond');
const { join } = require('./utils');

const recentWeather = a.sequenceOf([
    a.str('RE'),
    a.choice([
        a.str('BLSN'),
        a.str('FZDZ'),
        a.str('FZRA'),
        a.str('FZUP'),
        a.str('RASN'),
        a.str('SHGR'),
        a.str('SHGS'),
        a.str('SHRA'),
        a.str('SHSN'),
        a.str('SHUP'),
        a.str('TSGR'),
        a.str('TSGS'),
        a.str('TSRA'),
        a.str('TSSN'),
        a.str('TSUP'),
        a.str('DS'),
        a.str('DZ'),
        a.str('FC'),
        a.str('PL'),
        a.str('RA'),
        a.str('SG'),
        a.str('SN'),
        a.str('SS'),
        a.str('TS'),
        a.str('UP'),
        a.str('VA'),
    ]),
]);

const windShear = a.sequenceOf([
    a.str('WS'),
    a.whitespace,
    a.choice([
        a.str('ALL RWY'),
        a.sequenceOf([
            a.char('R'),
            a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
            a.possibly(
                a.anyOfString('LCR'),
            ),
        ]),
    ]),
]);
exports.windShear = windShear;

const seaSurfaceTemperatureAndStateOfTheSea = a.sequenceOf([
    a.char('W'),
    a.possibly(
        a.char('M'),
    ),
    a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
    a.char('/'),
    a.char('S'),
    a.digit.map((digit) => parseInt(digit, 10)),
]);
exports.seaSurfaceTemperatureAndStateOfTheSea = seaSurfaceTemperatureAndStateOfTheSea;

const seaSurfaceTemperatureAndStateOfTheSeaChain = a.choice([
    seaSurfaceTemperatureAndStateOfTheSea,
]);

const windShearChain = a.choice([
    a.sequenceOf([
        windShear,
        a.possibly(a.takeRight(a.whitespace)(seaSurfaceTemperatureAndStateOfTheSeaChain)),
    ]),
    seaSurfaceTemperatureAndStateOfTheSeaChain,
]);

const recentWeatherChain = a.choice([
    a.sequenceOf([
        recentWeather,
        a.possibly(a.takeRight(a.whitespace)(windShearChain)),
    ]),
    windShearChain,
]);
    


const supplementaryInformation = a.choice([
    recentWeatherChain,
    //windShearChain,
    //seaSurfaceTemperatureAndStateOfTheSeaChain,
])

exports.supplementaryInformation = supplementaryInformation;
