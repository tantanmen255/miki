'use strict'

const {Agent, ChronoCrossMarket, OpenEyeBlind} = require('../index');

let file = process.argv[2];

(async () => {
    let market = await ChronoCrossMarket.fromFile(file);
    let agent = new Agent(market, new OpenEyeBlind(1, 1000));
    await agent.workToday();

    let report = agent.broker.report;
    console.log(report.toString());
})();
