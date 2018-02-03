'use strict';

const expect = require('chai').expect;
const {Agent, ChronoCrossMarket, Util, Ticker, Index} = require('./index');

(async () => {
    let jsonArray = await Util.readCsvFile('log/log_1712_2516-2519.csv', Ticker.keys);
    let market = new ChronoCrossMarket(jsonArray);

    let index = new Index(3000);
    while (market.isOpened) {
        let ticker = await market.fetchTicker();
        index.add(ticker);
    }

    console.log(index.toCsv());

    // let agent = new Agent(market);
    // await agent.work();
    //
    // let asset = market.broker.asset;
    // console.log(asset);
})();
