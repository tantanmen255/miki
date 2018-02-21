'use strict';

const expect = require('chai').expect;
const {Order, OrderType, OrderTrigger, Asset} = require('../index');

describe('Order', () => {
    describe('#constructor()', () => {
        it('should support bid order', () => {
            let asset = new Asset(0, 1000000);
            let [amount, limitPrice, marketPrice, closeAmount, closePrice]
                = [0.6, 1000000, 1000000 - 1, 0.6, 1000000];

            let order = new Order(OrderType.bid, amount, OrderTrigger.limit(limitPrice));
            expect(order.state).to.be.equal('pending');

            order.open(1);
            expect(order.state).to.be.equal('open');
            expect(order.id).to.be.equal(1);

            expect(order.triggerAble(marketPrice)).to.be.true;
            order.tryTrigger(marketPrice, asset);
            expect(order.state).to.be.equal('closed');
            expect(order.closeAssetDelta.coinDelta).to.be.equal(closeAmount);
            expect(order.closeAssetDelta.currencyDelta).to.be.equal(-closeAmount * closePrice);
        });

        it('should support ask order', () => {
            let asset = new Asset(0.6, 0);
            let [amount, limitPrice, marketPrice, closeAmount, closePrice] = [0.6, 1000000, 1000000 + 1, 0.6, 1000000];

            let order = new Order(OrderType.ask, amount, OrderTrigger.limit(limitPrice));
            expect(order.state).to.be.equal('pending');

            order.open(2);
            expect(order.state).to.be.equal('open');
            expect(order.id).to.be.equal(2);

            expect(order.triggerAble(marketPrice)).to.be.true;
            order.tryTrigger(marketPrice, asset);
            expect(order.state).to.be.equal('closed');
            expect(order.closeAssetDelta.coinDelta).to.be.equal(-closeAmount);
            expect(order.closeAssetDelta.currencyDelta).to.be.equal(closeAmount * closePrice);
        });
    });
});
