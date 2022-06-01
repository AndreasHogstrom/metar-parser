const a = require('arcsecond');
const { join } = require("./utils");

const cloud = a.choice([
    a.sequenceOf([
        a.choice([
            a.sequenceOf([
                a.choice([
                    a.str('FEW').map(() => 'few'),
                    a.str('SCT').map(() => 'scattered'),
                    a.str('BKN').map(() => 'broken'),
                    a.str('OVC').map(() => 'overcast'),
                ]),
                a.choice([
                    a.str('///').map(() => 'unknown'),
                    a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10) * 100),
                ]),
            ]).map(([amount, base]) => ({
                amount,
                base,
            })),
            a.str('//////').map(() => ({
                amount: 'unknown',
                base: 'unknown',
            })),
        ]),
        a.possibly(
            a.choice([
                a.str('CB'),
                a.str('TCU'),
                a.str('///'),
            ])
        ),
    ]).map(([amount, cloudType]) => ({
        type: 'cloud',
        ...amount,
        cloudType,
    })),
    a.sequenceOf([
        a.str('VV'),
        a.choice([
            a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10)),
            a.str('///').map(() => 'unknown'),
        ]),
    ]).map(([, verticalVisibility]) => ({
        type: 'verticalVisibility',
        verticalVisibility,
    })),
    a.choice([
        a.str('NSC'),
        a.str('SKC'),
        a.str('CLR'),
    ]).map(() => ({
        type: 'noSignificantClouds',
    })),
    a.str('NCD').map(() => ({
        type: 'noCloudsDetected',
    })),
]);
exports.cloud = cloud;
