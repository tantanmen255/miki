'use strict';

const expect = require('chai').expect;
const {Agent, RandomMarket, BitFlyerMarket, ChronoCrossMarket} = require('../index');

let works = (market, n) => {
    return async () => {
        let agent = new Agent(market, false);
        for (let i = 1; i <= n; ++i) {
            await agent.work();
            expect(agent._priceHistory.count).to.be.equal(i);
            expect(agent._priceHistory.last).to.be.above(0);
        }
    };
};

describe('Agent', () => {
    describe('#work()', () => {
        it('should works for RandomMarket', works(new RandomMarket(), 5));
        it('should works for BitFlyerMarket', works(new BitFlyerMarket(), 2));
        // todo test BitFlyerMarket error handling
        it('should works for ChronoCrossMarket', works(new ChronoCrossMarket('log/log_171225_16-19.csv'), 5));
    });
});
