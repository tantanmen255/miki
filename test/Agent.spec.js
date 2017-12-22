'use strict';

const expect = require('chai').expect;
// const {Agent, RandomMarket} = require('../src/miki');
const {Agent} = require('../src/Agent');
const {RandomMarket} = require('../src/RandomMarket');
const miki = require('../src/miki');

describe('Agent', () => {
    describe('#work()', () => {
        it('should fetch price and record it', () => {
            let agent = new miki.Agent(new miki.RandomMarket(), false);

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