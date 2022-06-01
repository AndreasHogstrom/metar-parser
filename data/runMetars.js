const fs = require('fs/promises');
const { report } = require('../src/report');

async function run() {
    const metars = await fs.readFile(`${__dirname}/metars.txt`, { encoding: 'utf-8' });
    for (const metar of metars.trimEnd().split(/\n/)) {
        console.log(metar);
        report.fork(
            metar.trim(),
            (error, state) => {
                console.error(error);
                process.exit(1);
            },
            () => {},
        )
    }
}

run();
