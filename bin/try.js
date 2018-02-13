'use strict';

const expect = require('chai').expect;
const {Agent, ChronoCrossMarket, Util, Ticker, Index, OpenEyeBlind} = require('../index');

let file = 'log/log_1712_2516-2519.csv';

(async () => {
    let market = await ChronoCrossMarket.fromFile(file);
    let agent = new Agent(market, new OpenEyeBlind(1, 1000));
    await agent.workToday();

    let report = agent.broker.report;
    console.log(report.toString());
})();