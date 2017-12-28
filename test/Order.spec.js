'use strict';

const expect = require('chai').expect;
const {Order} = require('../index');

describe('Order', () => {
    describe('#constructor()', () => {
        it('should support bid order close', () => {
            let order = new Order('bid', 0.6, 1000000, 0.0015);
            expect(order.state).to.be.equal('pending');

            expect(order.openAssetDelta.coinDelta).to.be.equal(0);
            expect(order.openAssetDelta.currencyDelta).to.be.equal(-0.6 * 1000000);
            order.open(1);
            expect(order.state).to.be.equal('open');
            expect(order.id).to.be.equal(1);

            order.close(1000000 - 1);
            expect(order.state).to.be.equal('closed');
            expect(order.closeAssetDelta.coinDelta).to.be.equal(0.6 * (1 - 0.0015));
            expect(order.closeAssetDelta.currencyDelta).to.be.equal(0);
        });

        it('should support ask order state update', () => {
            let order = new Order('ask', 0.6, 1000000, 0.0015);
            expect(order.state).to.be.equal('pending');
            expect(order.openAssetDelta.coinDelta).to.be.equal(-0.6);
            expect(order.openAssetDelta.currencyDelta).to.be.equal(0);

            order.open(2);
            expect(order.state).to.be.equal('open');
            expect(order.id).to.be.equal(2);

            order.close(1000000 + 1);
            expect(order.state).to.be.equal('closed');
            expect(order.closeAssetDelta.coinDelta).to.be.equal(0);
            expect(order.closeAssetDelta.currencyDelta).to.be.equal(0.6 * 1000000 * (1 - 0.0015));
        });
    });
});
