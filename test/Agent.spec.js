'use strict';

const expect = require('chai').expect;
const {Agent, RandomMarket, BitFlyerMarket} = require('../index');

let works = (market) => {
    return () => {
        let agent = new Agent(market, false);

        agent.work().then(() => {
            expect(agent.getPriceHistory().getCount()).to.be.equal(1);
            expect(agent.getPriceHistory().getLast()).to.be.above(0);

            agent.work().then(() => {
                expect(agent.getPriceHistory().getCount()).to.be.equal(2);
                expect(agent.getPriceHistory().getLast()).to.be.above(0);
            });
        });
    };
};

describe('Agent', () => {
    describe('#work()', () => {
        it('should works for RandomMarket', works(new RandomMarket()));
        it('should works for BitFlyerMarket', works(new BitFlyerMarket()));
        // todo test BitFlyerMarket error handling
    });
});
