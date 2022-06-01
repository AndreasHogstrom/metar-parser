const a = require('arcsecond');
const { cloud } = require("./cloud");
const { weather, weatherMany1 } = require("./weather");
const { wind } = require("./wind");
const { join } = require("./utils");

const trend = a.choice([
    a.str('NOSIG'),
    a.sequenceOf([
        a.choice([
            a.str('BECMG'),
            a.str('TEMPO'),
        ]),
        a.possibly(
            a.sequenceOf([
                a.whitespace,
                a.choice([
                    a.sequenceOf([
                        a.str('AT'),
                        a.exactly(4)(a.digit),
                    ]),
                    a.sequenceOf([
                        a.str('FM'),
                        a.exactly(4)(a.digit),
                    ]),
                    a.sequenceOf([
                        a.str('TL'),
                        a.exactly(4)(a.digit),
                    ]),
                    a.sequenceOf([
                        a.str('FM'),
                        a.exactly(4)(a.digit),
                        a.whitespace,
                        a.str('TL'),
                        a.exactly(4)(a.digit),
                    ]),
                ]),
            ])
        ),
        a.possibly(
            a.sequenceOf([
                a.whitespace,
                wind,
            ])
        ),
        a.choice([
            a.str('CAVOK'),
            a.sequenceOf([
                a.possibly(
                    a.sequenceOf([
                        a.whitespace,
                        a.exactly(4)(a.digit).map((digits) => parseInt(join(digits), 10)),
                    ]).map(([, visibility]) => ({
                        type: 'visibility',
                        visibility,
                        unit: 'meter',
                    }))
                ),
                a.possibly(
                    a.takeRight(
                        a.whitespace,
                    )(
                        a.choice([
                            a.str('NSW'),
                            a.sequenceOf([
                                weatherMany1,
                            ]),
                        ]),
                    ),
                ),
                a.possibly(
                    a.takeRight(
                        a.whitespace,
                    )(
                        a.choice([
                            a.str('NSC'),
                            a.sequenceOf([
                                cloud,
                            ]),
                        ]),
                    ),
                ),
            ]),
        ]),
    ]),
]);
exports.trend = trend;
