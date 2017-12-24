'use strict'

const {Agent, BitFlyerMarket, RandomMarket} = require('./index');

let debug = (process.argv[2] === 'debug');
let market = debug ? new RandomMarket() : new BitFlyerMarket(1000);
let agent = new Agent(market);
agent.work();
