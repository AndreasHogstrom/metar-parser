const a = require('arcsecond');
const { join } = require("./utils");

const timestamp = a.sequenceOf([
    a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
    a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
    a.exactly(2)(a.digit).map((digits) => parseInt(join(digits), 10)),
    a.char('Z'),
]).map(([day, hour, minute, timezone]) => ({
    type: 'timestamp',
    // TODO: If it turns out to be in the future, use yesterday.
    timestamp: new Date(Date.UTC((new Date).getUTCFullYear(), (new Date).getUTCMonth(), day, hour, minute)),
}));
exports.timestamp = timestamp;
