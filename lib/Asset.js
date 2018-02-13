'use strict';

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

    get currency() {
        return this._currency;
    }

    exchangedCurrency(price) {
        return this.coin * price + this.currency;
    }

    embraceable(assetDelta) {
        return assetDelta.coinDelta >= -this.coin && assetDelta.currencyDelta >= -this.currency;
    }

    embrace(assetDelta) {
        expect(this.embraceable(assetDelta), this + ' embraceable ' + assetDelta).to.be.true;
        return new Asset(this.coin + assetDelta.coinDelta, this.currency + assetDelta.currencyDelta);
    }

    diff(asset) {
        return new AssetDelta(this.coin - asset.coin, this.currency - asset.currency);
    }
}

module.exports = Asset;