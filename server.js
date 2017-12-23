'use strict'

const {Agent, BitFlyerMarket} = require('./index');
let agent = new Agent(new BitFlyerMarket());
agent.work();
