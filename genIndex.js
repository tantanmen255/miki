'use strict'

const {Agent, ChronoCrossMarket, Util, Ticker, Index} = require('./index');

let file = process.argv[2];

(async () => {
    let market = await ChronoCrossMarket.fromFile(file);

    let indexes = [1000, 2000, 4000, 8000, 16000, 32000].map(x => new Index(x));
    while (market.isOpened) {
        let ticker = await market.fetchTicker();
        indexes.forEach(x => x.add(ticker));
    }

    for (let i in indexes) {
        let x = indexes[i];
        let outFile = file.replace('csv', x.intervalString + '.csv');
        await Util.writeString(outFile, x.toCsv());
    }
})();
