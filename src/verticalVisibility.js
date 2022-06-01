const a = require('arcsecond');
const { join } = require("./utils");

const verticalVisibility = a.takeRight(a.str('VV'))(
    a.exactly(3)(a.digit).map((digits) => parseInt(join(digits), 10))
).map((visibility) => ({
    type: 'verticalVisibility',
    visibility: visibility * 100,
    unit: 'feet',
}));
exports.verticalVisibility = verticalVisibility;
