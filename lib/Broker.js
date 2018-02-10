'use strict'

const expect = require('chai').expect;

const Asset = require('./Asset');
const Order = require('./Order');
const Ticker = require('./Ticker');

class Broker {
    constructor(asset, orderList) {
        this._asset = asset;
        this._orderList = orderList;
        this._lastTicker = undefined;
    }

    get asset() {
        return this._asset;
    }

    get orderList() {
        return this._orderList;
    }

    get lastTicker() {
        return this._lastTicker;
    }

    updateInfo(ticker) {
        this._lastTicker = ticker;

        let tryTrigger = (order, price) => {
            if (order.triggerAble(price)) {
                order.close(price);
                if (this.asset.embraceable(order.closeAssetDelta)) {
                    this.asset.embrace(order.closeAssetDelta);
                } else {
                    order.reject();
                }
            }
        };
        this.orderList.forEach(x => tryTrigger(x, ticker.ltp));

        this._orderList = this.orderList.filter(order => order.state === 'open');
    }

    async requestOpenOrder(order) {
        expect(order.state).to.equal('pending');

        order.open(0);
        this.orderList.push(order);
    }
}

module.exports = Broker;