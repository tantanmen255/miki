'use strict';

const expect = require('chai').expect;
const Market = require('./Market');
const Ticker = require('./Ticker');
const Util = require('./Util');
const Asset = require('./Asset');
const Order = require('./Order');

class ChronoCrossMarket extends Market {
    constructor(jsonArray) {
        expect(jsonArray).to.be.an.instanceOf(Array).that.have.length.least(1);
        super();
        this.a = jsonArray;
        this.i = 0;
        this._asset = new Asset(0, 1000000, []);
    }

    get isOpened() {
        return this.i < this.a.length;
    }

    get asset() {
        return this._asset;
    }

    async fetchTicker() {
        expect(this.isOpened).to.be.true;
        let ticker = new Ticker(this.a[this.i++]);

        if (this.asset.orderList.length > 0) {
            let ltp = ticker.ltp;
            // console.log(ltp);

            let order = this.asset.orderList[0];
            if (order.validActualUnitPrice(ltp)) {
                order.close(ltp);
                this.asset.coin += order.returnAmount;
                this.asset.currency += order.returnTotalPrice;
                this.asset.orderList.length = 0; // todo remove by id
                console.log('order closed.', this.asset);
            }
        }

        return ticker;
    }

    async requestOpenOrder(type, expectAmount, expectUnitPrice) {
        //await this.fetchTicker();
        let order = new Order(type, expectAmount, expectUnitPrice, 0.0015);
        order.open(0);
        this.asset.coin -= order.requireAmount;
        this.asset.currency -= order.requireTotalPrice;
        this.asset.orderList.push(order);
        console.log('order open.', this.asset);
    }
}

module.exports = ChronoCrossMarket;
