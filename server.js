'use strict'

const {Agent, BitFlyerMarket} = require('./index');

let production = (process.argv[2] === 'production');

let market = new BitFlyerMarket(1000);
let agent = new Agent(market, production);
agent.keepWorking();
