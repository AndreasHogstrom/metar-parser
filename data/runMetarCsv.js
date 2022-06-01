const { report } = require('../src/report');
const fs = require('fs').promises;

async function main() {
    const input = process.argv[2];
    const lines = (await fs.readFile(input, { encoding: 'utf-8' }))
        .split(/\n/)
        .map((line) => line.split(/,/))
        .filter((line, i) => line && i !== 0);

    for (const line of lines) {
        report.fork(
            'METAR ' + line[28].trim(),
            (error, state) => {
                console.log('METAR ' + line[28]);
                console.error(error);
                process.exit(1);
            },
            () => { },
        )
    }
}

main();
