'use strict';

const expect = require('chai').expect;
const {Order} = require('../index');

describe('Order', () => {
    describe('#constructor()', () => {
        it('should support bid order close', () => {
            let order = new Order('bid', 0.6, 1000000, 0.0015);
            expect(order.state).to.be.equal('pending');

            order.open(1);
            expect(order.state).to.be.equal('open');
            expect(order.id).to.be.equal(1);

            order.close(1000000 - 1);
            expect(order.state).to.be.equal('closed');
            expect(order.returnAmount).to.be.equal(0.6 * (1 - 0.0015));
            expect(order.returnTotalPrice).to.be.equal(0);
        });

        it('should support ask order state update', () => {
            let order = new Order('ask', 0.6, 1000000, 0.0015);
            expect(order.state).to.be.equal('pending');

            order.open(2);
            expect(order.state).to.be.equal('open');
            expect(order.id).to.be.equal(2);

            order.close(1000000 + 1);
            expect(order.state).to.be.equal('closed');
            expect(order.returnAmount).to.be.equal(0);
            expect(order.returnTotalPrice).to.be.equal(0.6 * 1000000 * (1 - 0.0015));
        });
    });
});
