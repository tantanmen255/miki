'use strict';

const expect = require('chai').expect;
const {Order, OrderType, OrderTrigger} = require('../index');

describe('Order', () => {
    describe('#constructor()', () => {
        it('should support bid order', () => {
            let [amount, limitPrice, closePrice] = [0.6, 1000000, 1000000 - 1];

            let order = new Order(OrderType.bid, amount, OrderTrigger.limit(limitPrice));
            expect(order.state).to.be.equal('pending');

            order.open(1);
            expect(order.state).to.be.equal('open');
            expect(order.id).to.be.equal(1);

            expect(order.triggerAble(closePrice)).to.be.true;
            order.close(closePrice);
            expect(order.state).to.be.equal('closed');
            expect(order.closeAssetDelta.coinDelta).to.be.equal(amount);
            expect(order.closeAssetDelta.currencyDelta).to.be.equal(-amount * limitPrice);
        });

        it('should support ask order', () => {
            let [amount, limitPrice, closePrice] = [0.6, 1000000, 1000000 + 1];

            let order = new Order(OrderType.ask, amount, OrderTrigger.limit(limitPrice));
            expect(order.state).to.be.equal('pending');

            order.open(2);
            expect(order.state).to.be.equal('open');
            expect(order.id).to.be.equal(2);

            order.close(closePrice);
            expect(order.state).to.be.equal('closed');
            expect(order.closeAssetDelta.coinDelta).to.be.equal(-amount);
            expect(order.closeAssetDelta.currencyDelta).to.be.equal(amount * limitPrice);
        });
    });
});
