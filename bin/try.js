'use strict';

const expect = require('chai').expect;
const {Agent, ChronoCrossMarket, Util, Ticker, Index} = require('../index');

let file = 'log/log_1712_2516-2519.csv';

(async () => {
    let market = await ChronoCrossMarket.fromFile(file);
    let agent = new Agent(market);
    await agent.work();

    let asset = market.broker.asset;
    console.log(asset);
})();
