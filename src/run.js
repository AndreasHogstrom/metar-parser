const { report } = require('./report');

function run(metar) {
    console.log(JSON.stringify(report.run(metar), null, 4));
}

run('METAR KDEN 010000Z AUTO 33005KT 10SM OVC110 01/M06 A2995 RMK T00101060 MADISHF');
