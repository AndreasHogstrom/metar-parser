const a = require('arcsecond');
const { cloud } = require("./cloud");
const { pressure } = require("./pressure");
const { remarks } = require("./remarks");
const { rvrMany1 } = require("./rvr");
const { temperature } = require("./temperature");
const { timestamp } = require("./timestamp");
const { trend } = require("./trend");
const { verticalVisibility } = require("./verticalVisibility");
const { visibility } = require("./visibility");
const { weatherMany1 } = require("./weather");
const { wind } = require("./wind");
const { join } = require("./utils");
const { supplementaryInformation } = require('./supplementaryInformation');

const report = a.sequenceOf([
    a.choice([
        a.str('METAR COR'),
        a.str('METAR'),
        a.str('SPECI COR'),
        a.str('SPECI'),
    ]).map((report) => ({
        type: 'report',
        report,
    })),
    a.takeRight(a.whitespace)(
        a.exactly(4)(a.letter).map((values) => join(values)).map((location) => ({
            type: 'location',
            location,
        })),
    ),
    a.takeRight(a.whitespace)(
        timestamp,
    ),
    a.possibly(
        a.takeRight(a.whitespace)(
            a.str('AUTO').map((automatic) => ({
                type: 'automatic',
                automatic: automatic === 'AUTO',
            })),
        ),
    ),
    a.possibly(
        a.sequenceOf([
            a.whitespace,
            wind,
        ]),
    ),
    a.possibly(
        a.choice([
            a.takeRight(
                a.whitespace,
            )(
                a.str('CAVOK'),
            ),
            a.sequenceOf([
                a.possibly(
                    a.takeRight(
                        a.whitespace,
                    )(
                        visibility,
                    ),
                ),
                a.possibly(
                    a.takeRight(
                        a.whitespace,
                    )(
                        rvrMany1,
                    ),
                ),
            ]),
        ]),
    ),

    a.possibly(
        a.sequenceOf([
            a.whitespace,
            weatherMany1,
        ]),
    ),

    a.possibly(
        a.many1(
            a.sequenceOf([
                a.whitespace,
                cloud,
            ]),
        ),
    ),
    //a.tapParser((x) => console.log(JSON.stringify(x, null, 4))),

    a.possibly(
        a.takeRight(a.whitespace)(
            verticalVisibility,
        ),
    ),
    a.possibly(
        a.sequenceOf([
            a.whitespace,
            temperature,
        ]),
    ),
    a.possibly(
        a.sequenceOf([
            a.whitespace,
            pressure,
        ]),
    ),
    a.possibly(
        a.sequenceOf([
            a.whitespace,
            supplementaryInformation,
        ]),
    ),
    a.possibly(
        a.sequenceOf([
            a.whitespace,
            trend,
        ]),
    ),
    a.possibly(
        a.sequenceOf([
            a.whitespace,
            remarks,
        ]),
    ),
    a.endOfInput,
]);
exports.report = report;
