'use strict';

const expect = require('chai').expect;
const Market = require('./Market');
const Ticker = require('./Ticker');
const Asset = require('./Asset');
const Broker = require('./Broker');

class ChronoCrossMarket extends Market {
    constructor(jsonArray) {
        expect(jsonArray).to.be.an.instanceOf(Array).that.have.length.at.least(1);
        super();
        this.a = jsonArray;
        this.i = 0;
        this._broker = new Broker(new Asset(0, 1000000, []), []);
    }

    get isOpened() {
        return this.i < this.a.length;
    }

    get broker() {
        return this._broker;
    }

    async fetchTicker() {
        expect(this.isOpened, 'ChronoCrossMarket.isOpened').to.be.true;
        let ticker = new Ticker(this.a[this.i++]);

        this.broker.updateInfo(ticker);

        return ticker;
    }
}

module.exports = ChronoCrossMarket;
