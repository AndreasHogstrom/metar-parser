const a = require('arcsecond');
const { join } = require("./utils");

const pressure = a.choice([
    // ICAO
    a.sequenceOf([
        a.char('Q'),
        a.exactly(4)(a.digit).map((digits) => parseInt(join(digits), 10)),
    ]).map(([, pressure]) => ({
        type: 'pressure',
        pressure,
        unit: 'hPa',
    })),
    // FAA
    a.sequenceOf([
        a.char('A'),
        a.exactly(4)(a.digit).map((digits) => parseInt(join(digits), 10)),
    ]).map(([, pressure]) => ({
        type: 'pressure',
        pressure: pressure / 100,
        unit: 'inches',
    })),
]);

exports.pressure = pressure;
