'use strict';

const Order = require('./Order');
const OrderType = require('./OrderType');
const OrderTrigger = require('./OrderTrigger');

class OpenEyeBlind {
    constructor(orderAmount, sheepCountLimit) {
        this.orderAmount = orderAmount;
        this.sheepCountLimit = sheepCountLimit;
        this.sheepCount = 0;
    }

    async onBroker(broker) {
        this.sheepCount++;

        if (this.sheepCount >= this.sheepCountLimit) {
            if (broker.orderList.length === 0) {
                this.sheepCount = 0;
                let orderType = broker.asset.coin > 0 ? OrderType.ask : OrderType.bid;
                let order = new Order(orderType, this.orderAmount, OrderTrigger.immediate());
                await broker.requestOpenOrder(order);
            }
        }
    }
}

module.exports = OpenEyeBlind;
