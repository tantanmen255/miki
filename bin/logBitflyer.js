'use strict'

const {Agent, BitFlyerMarket, TickerLogger} = require('../index');

let market = new BitFlyerMarket(1000);
let strategy = new TickerLogger();
let agent = new Agent(market, strategy);
agent.perceptualMotionDream();
