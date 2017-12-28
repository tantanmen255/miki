'use strict'

const expect = require('chai').expect;

const Asset = require('./Asset');
const Order = require('./Order');
const Ticker = require('./Ticker');

class Broker {
    constructor(asset, orderList) {
        this._asset = asset;
        this._orderList = orderList;
    }

    get asset() {
        return this._asset;
    }

    get orderList() {
        return this._orderList;
    }

    updateInfo(ticker) {
        let ltp = ticker.ltp;
        this.orderList.filter(order => order.validActualUnitPrice(ltp))
            .forEach(order => {
                order.close(ltp);
                this.asset.embrace(order.closeAssetDelta);
            });
        this._orderList = this.orderList.filter(order => order.state !== 'closed');
    }

    async requestOpenOrder(type, expectAmount, expectUnitPrice) {
        let order = new Order(type, expectAmount, expectUnitPrice, 0.0015);

        order.open(0);
        this.asset.embrace(order.openAssetDelta);
        this.orderList.push(order);
    }
}

module.exports = Broker;