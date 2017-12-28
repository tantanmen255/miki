'use strict';

const expect = require('chai').expect;
const {Agent, ChronoCrossMarket, Util, Ticker} = require('./index');

(async () => {
    let jsonArray = await Util.readCsvFile('log/log_171225_16-19.csv', Ticker.keys);
    let market = new ChronoCrossMarket(jsonArray);

    let agent = new Agent(market, true);
    await agent.work();

    let asset = market.broker.asset;
    console.log(asset);
})();
