'use strict'

const {Agent, ChronoCrossMarket, OpenEyeBlind, BuyingWinnerSellingLoser, Util, Ticker} = require('../index');

(async () => {
    // let file = process.argv[2];
    let files = [
        // '01-17', '01-18', '01-19', '01-20', '01-22',
        // '01-23', '01-24', '01-27', '01-28', '01-29',
        // '01-30', '01-31', '02-01', '02-02', '02-03',

        // '02-03'
        '01-17'
    ].map(x => 'log/2018-' + x + '.log_ticker.csv');

    for (let i = 0; i < files.length; ++i) {
        let file = files[i];

        let start = new Date();

        let market = await ChronoCrossMarket.fromFile(file); // +2s
        let agent = new Agent(market, new BuyingWinnerSellingLoser(1));
        await agent.workToday(); // fetchTicker: +2s strategy: +1s

        let cost = new Date() - start;

        // let report = agent.broker.report;
        console.log(cost + 'ms');
        // console.log(file);
        // console.log(report.toString());
    }
})();
