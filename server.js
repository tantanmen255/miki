'use strict'

const {Agent, BitFlyerMarket, RandomMarket} = require('./index');

let Market = process.argv[2] === 'debug' ? RandomMarket : BitFlyerMarket;
let agent = new Agent(new Market());
agent.work();
