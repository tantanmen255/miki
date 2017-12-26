'use strict';

const expect = require('chai').expect;
const Market = require('./Market');
const Ticker = require('./Ticker');
const Util = require('./Util');

class ChronoCrossMarket extends Market {
    constructor(csvFile) {
        super();
        this.csvFile = csvFile;
        this.a = [];
        this.i = -1;
    }

    isOpened() {
        return this.i < this.a.length;
    }

    async fetchTicker() {
        if (this.i === -1) {
            this.a = await Util.readCsvFile(this.csvFile);
            this.i = 0;
        }

        expect(this.isOpened()).to.be.true;

        let ticker = new Ticker(this.a[this.i++]);
        return ticker;
    }
}

module.exports = ChronoCrossMarket;
