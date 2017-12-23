'use strict';

const expect = require('chai').expect;
const {Agent, RandomMarket, BitFlyerMarket} = require('../index');

describe('Agent', () => {
    describe('#work()', () => {
        it('should fetch price and record it', () => {
            let agent = new Agent(new RandomMarket(), false);

            agent.work().then(() => {
                expect(agent.getPriceHistory().getCount()).to.equal(1);
                expect(agent.getPriceHistory().getLast()).above(0);

                agent.work().then(() => {
                    expect(agent.getPriceHistory().getCount()).to.equal(2);
                    expect(agent.getPriceHistory().getLast()).above(0);
                });
            });
        });

        it('should fetch price and record it for BitFlyerMarket', () => {
            let agent = new Agent(new BitFlyerMarket(), false);

            agent.work().then(() => {
                expect(agent.getPriceHistory().getCount()).to.equal(1);
                expect(agent.getPriceHistory().getLast()).above(0);

                agent.work().then(() => {
                    expect(agent.getPriceHistory().getCount()).to.equal(2);
                    expect(agent.getPriceHistory().getLast()).above(0);
                });
            });
        });
    });
});
