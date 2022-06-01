const { cloud } = require('./cloud');


test.each([
    ['NSC'],
    ['NCD'],
    ['FEW050'],
    ['SCT040'],
    ['BKN030'],
    ['OVC020'],
    ['FEW///'],
    ['//////'],
    ['FEW050'],
    ['VV123'],
    ['VV///'],
    ['FEW050'],
    ['BKN009TCU'],
    ['BKN009CB'],
    ['BKN009///'],
    ['/////////'],
    ['SKC'],
    ['CLR'],
    ['OVC110'],
])('%s', (input) => {
    const result = cloud.run(input);
    expect(result.isError).toBe(false);
    expect(result.index).toBe(input.length);
});
