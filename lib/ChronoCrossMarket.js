'use strict';

const expect = require('chai').expect;
const Market = require('./Market');
const Ticker = require('./Ticker');
const Asset = require('./Asset');
const Broker = require('./Broker');
const Util = require('./Util');

class ChronoCrossMarket extends Market {
    static async fromFile(file) {
        let jsonArray = await Util.readCsvFile(file, Ticker.keys);
        return new ChronoCrossMarket(jsonArray);
    }

    constructor(jsonArray) {
        expect(jsonArray).to.be.an.instanceOf(Array).that.have.length.at.least(1);
        super();
        this.a = jsonArray;
        this.i = 0;
    }

    get isOpened() {
        return this.i < this.a.length;
    }

    async fetchTicker() {
        expect(this.isOpened, 'ChronoCrossMarket.isOpened').to.be.true;
        let ticker = new Ticker(this.a[this.i++]);
        return ticker;
    }
}

module.exports = ChronoCrossMarket;
