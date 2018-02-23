'use strict';

const expect = require('chai').expect;
const {Agent, ChronoCrossMarket, Util, Ticker, Index, OpenEyeBlind} = require('../index');

(async () => {
    let file = 'log/log_1712_2516-2519.csv';
    let market = await ChronoCrossMarket.fromFile(file);
})();

