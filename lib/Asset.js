'use strict'

const expect = require('chai').expect;

class Asset {
    constructor(coin = 0, currency = 0) {
        this._coin = coin;
        this._currency = currency;
    }

    toString() {
        return '(' + this.coin + ',' + this.currency + ')';
    }

    get coin() {
        return this._coin;
    }

    set coin(value) {
        expect(value).to.be.least(0, 'coin value');
        this._coin = value;
    }

    get currency() {
        return this._currency;
    }

    set currency(value) {
        expect(value).to.be.least(0, 'currency value');
        this._currency = value;
    }

    embraceable(assetDelta) {
        return assetDelta.coinDelta >= -this.coin && assetDelta.currencyDelta >= -this.currency;
    }

    embrace(assetDelta) {
        expect(this.embraceable(assetDelta), this + ' embraceable ' + assetDelta).to.be.true;
        this.coin += assetDelta.coinDelta;
        this.currency += assetDelta.currencyDelta;
    }
}

module.exports = Asset;