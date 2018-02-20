'use strict';

const Order = require('./Order');
const OrderType = require('./OrderType');
const OrderTrigger = require('./OrderTrigger');
const Index = require('./Index');

class BuyingWinnerSellingLoser {
    constructor(orderAmount) {
        this.orderAmount = orderAmount;

        this.stopBuyBase = undefined;
        this.stopBuyDelta = 6000;

        this.stopSellBase = undefined;
        this.stopSellDelta = -4000;
    }

    async onBroker(broker) {
        let ltp = broker.lastTicker.ltp;

        let trigger;
        if (broker.asset.coin === 0) {
            this.stopBuyBase = this.stopBuyBase === undefined ? ltp : Math.min(this.stopBuyBase, ltp);
            trigger = (ltp >= this.stopBuyBase + this.stopBuyDelta);
        } else {
            this.stopSellBase = Math.max(this.stopSellBase, ltp);
            trigger = (ltp <= this.stopSellBase + this.stopSellDelta);
        }

        if (trigger) {
            this.triggerPrice = ltp;
            if (broker.orderList.length === 0) {
                this.sheepCount = 0;
                let orderType = broker.asset.coin > 0 ? OrderType.ask : OrderType.bid;
                let order = new Order(orderType, this.orderAmount, OrderTrigger.immediate());
                await broker.requestOpenOrder(order);

                if (orderType === OrderType.bid) {
                    this.stopBuyBase = undefined;
                    this.stopSellBase = ltp;
                } else {
                    this.stopBuyBase = ltp;
                    this.stopSellBase = undefined;
                }
            }
        }
    }
}

module.exports = BuyingWinnerSellingLoser;
