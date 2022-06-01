const a = require('arcsecond');

const weather = a.sequenceOf([
    a.choice([
        a.sequenceOf([
            a.possibly(
                a.choice([
                    a.char('-'),
                    a.char('+'),
                ]),
            ),
            a.choice([
                a.str('FZDZ'),
                a.str('FZRA'),
                a.str('FZUP'),
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
                a.str('DZ'),
                a.str('RA'),
                a.str('SN'),
                a.str('SG'),
                a.str('PL'),
                a.str('DS'),
                a.str('SS'),
                a.str('FC'),
                a.str('UP'),
            ]),
        ]),
        a.choice([
            a.str('BCFG'),
            a.str('BLDU'),
            a.str('BLSA'),
            a.str('BLSN'),
            a.str('DRDU'),
            a.str('DRSA'),
            a.str('DRSN'),
            a.str('FZFG'),
            a.str('MIFG'),
            a.str('PRFG'),
            a.str('IC'),
            a.str('FG'),
            a.str('BR'),
            a.str('SA'),
            a.str('DU'),
            a.str('HZ'),
            a.str('FU'),
            a.str('VA'),
            a.str('SQ'),
            a.str('PO'),
            a.str('TS'),
        ]),
        a.sequenceOf([
            a.str('VC'),
            a.choice([
                a.str('BLSN'),
                a.str('BLSA'),
                a.str('BLDU'),
                a.str('FG'),
                a.str('PO'),
                a.str('FC'),
                a.str('DS'),
                a.str('SS'),
                a.str('TS'),
                a.str('SH'),
                a.str('VA'),
            ]),
        ]),
    ]),
]);

const other = a.choice([
    a.str('SQ'),
    a.str('PO'),
    a.str('DS'),
    a.str('SS'),
    a.str('FC'),
]);

const descriptor = a.choice([
    a.str('VC'),
    a.str('RE'),
    a.str('MI'),
    a.str('PR'),
    a.str('BC'),
    a.str('DR'),
    a.str('BL'),
    a.str('SH'),
    a.str('TS'),
    a.str('FZ'),
]);

const obsucration = a.choice([
    a.str('FG'),
    a.str('BR'),
    a.str('HZ'),
    a.str('VA'),
    a.str('DU'),
    a.str('FU'),
    a.str('SA'),
    a.str('PY'),
]);

const precipitation = a.choice([
    a.str('RA'),
    a.str('DZ'),
    a.str('SN'),
    a.str('SG'),
    a.str('IC'),
    a.str('PL'),
    a.str('GR'),
    a.str('GS'),
    a.str('UP'),
]);

const weather2 = a.sequenceOf([
    a.possibly(
        a.anyOfString('-+'),
    ),
    a.many(descriptor),
    a.choice([
        other,
        obsucration,
        a.sequenceOf([
            precipitation,
            precipitation,
        ]),
        precipitation,
    ]),
]);
exports.weather = weather2;

const weatherMany1 = a.sequenceOf([
    weather2,
    a.many(
        a.takeRight(
            a.whitespace,
        )(
            weather2,
        ),
    ),
]).map(([head, rest]) => [head, ...rest]);
exports.weatherMany1 = weatherMany1;
