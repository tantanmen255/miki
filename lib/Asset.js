'use strict'

const expect = require('chai').expect;

class Asset {
    constructor(coin = 0, currency = 0, orderList = []) {
        this._coin = coin;
        this._currency = currency;
        this._orderList = orderList;
    }

    get coin() {
        return this._coin;
    }

    set coin(value) {
        expect(value).to.be.least(0);
        this._coin = value;
    }

    get currency() {
        return this._currency;
    }

    set currency(value) {
        expect(value).to.be.least(0);
        this._currency = value;
    }

    get orderList() {
        return this._orderList;
    }
}

module.exports = Asset;