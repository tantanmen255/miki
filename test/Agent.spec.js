'use strict';

const expect = require('chai').expect;
const {Agent, RandomMarket, BitFlyerMarket, ChronoCrossMarket, Util} = require('../index');

let works = (market, n) => {
    return async () => {
        let agent = new Agent(market);
        for (let i = 1; i <= n; ++i) {
            await agent.work();
        }
    };
};

describe('Agent', () => {
    describe('#work()', async () => {
        it('should works for RandomMarket', works(new RandomMarket(), 5));
        it('should works for BitFlyerMarket', works(new BitFlyerMarket(), 1));
        // todo test BitFlyerMarket error handling
    });
});
