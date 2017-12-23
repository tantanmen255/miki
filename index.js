'use strict';

const {Agent} = require('./src/Agent');
const {RandomMarket} = require('./src/RandomMarket');
const {BitFlyerMarket} = require('./src/BitFlyerMarket');

module.exports = {
    Agent: Agent,
    RandomMarket: RandomMarket,
    BitFlyerMarket: BitFlyerMarket
};
