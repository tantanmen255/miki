'use strict';

const expect = require('chai').expect;

const Asset = require('./Asset');
const Order = require('./Order');
const Ticker = require('./Ticker');

class ReportBuilder {
    constructor(initialAsset) {
        this.initialAsset = initialAsset;
        this.orderLogs = [];
    }

    addClose(order, price) {
        this.orderLogs.push('(' + order.toString() + ') closed at ' + price);
    }

    build(finalAsset, price) {
        return new Report(this.initialAsset, finalAsset, price, this.orderLogs);
    }
}

class Report {
    constructor(initialAsset, finalAsset, price, orderLogs) {
        this._initialAsset = initialAsset;
        this._finalAsset = finalAsset;
        this._price = price;
        this._orderLogs = orderLogs;
    }

    toString() {
        let profitOp = this.profit >= 0 ? '+'  : '';
        return profitOp + this.profit + '\n' + this.orderLogs.join('\n');
    }

    get initialAsset() {
        return this._initialAsset;
    }

    get finalAsset() {
        return this._finalAsset;
    }

    get price() {
        return this._price;
    }

    get profit() {
        return this.finalAsset.exchangedCurrency(this.price) - this.initialAsset.exchangedCurrency(this.price);
    }

    get orderLogs() {
        return this._orderLogs;
    }
}

class Broker {
    constructor(asset, orderList) {
        this._asset = asset;
        this._orderList = orderList;
        this._lastTicker = undefined;
        this.reportBuilder = new ReportBuilder(asset);
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

    get report() {
        return this.reportBuilder.build(this.asset, this.lastTicker.ltp);
    }

    updateInfo(ticker) {
        this._lastTicker = ticker;

        let tryTrigger = (order, price) => {
            if (order.triggerAble(price)) {
                this.reportBuilder.addClose(order, price);
                order.close(price);

                if (this.asset.embraceable(order.closeAssetDelta)) {
                    this._asset = this.asset.embrace(order.closeAssetDelta);
                } else {
                    // console.log('but rejected by delta ' + order.closeAssetDelta);
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