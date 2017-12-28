'use strict'

const expect = require('chai').expect;

class AssetDelta {
    constructor(coinDelta, currencyDelta) {
        expect(coinDelta).to.be.an('number');
        expect(currencyDelta).to.be.an('number');
        this._coinDelta = coinDelta;
        this._currencyDelta = currencyDelta;
    }

    toString() {
        return '(' + this.coinDelta + ',' + this.currencyDelta + ')';
    }

    get coinDelta() {
        return this._coinDelta;
    }

    set coinDelta(value) {
        expect(value).to.be.an('number');
        this._coinDelta = value;
    }

    get currencyDelta() {
        return this._currencyDelta;
    }

    set currencyDelta(value) {
        expect(value).to.be.an('number');
        this._currencyDelta = value;
    }

    merge(assetDelta) {
        this.coinDelta += assetDelta.coinDelta;
        this.currencyDelta += assetDelta.currencyDelta;
    }
}

module.exports = AssetDelta;