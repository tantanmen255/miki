'use strict';

const expect = require('chai').expect;

const AssetDelta = require('./AssetDelta');

class Order {
    constructor(type, expectAmount, expectUnitPrice, feePercent) {
        expect(['bid', 'ask']).to.include(type);
        expect(expectAmount).to.be.above(0);
        expect(expectUnitPrice).to.be.above(0);
        expect(feePercent).to.be.within(-1, 1);
        this._type = type;
        this._expectAmount = expectAmount;
        this._expectUnitPrice = expectUnitPrice;
        this._feePercent = feePercent;
        this._state = 'pending';
    }

    get type() {
        return this._type;
    }

    get expectAmount() {
        return this._expectAmount;
    }

    get expectUnitPrice() {
        return this._expectUnitPrice;
    }

    get feePercent() {
        return this._feePercent;
    }

    get expectTotalPrice() {
        return this.expectAmount * this.expectUnitPrice;
    }

    get state() {
        return this._state;
    }

    get openAssetDelta() {
        if (this.type === 'bid') return new AssetDelta(0, -this.expectTotalPrice);
        if (this.type === 'ask') return new AssetDelta(-this.expectAmount, 0);
    }

    open(id) {
        expect(this.state).to.be.equal('pending');
        expect(id).to.be.not.null;
        this._id = id;
        this._state = 'open';
    }

    get id() {
        expect(this.state).to.be.not.equal('pending');
        return this._id;
    }

    cancel() {
        expect(this.state).to.be.equal('open');
        this._state = 'canceled';
    }

    close(actualUnitPrice) {
        expect(this.state).to.be.equal('open');
        expect(this.validActualUnitPrice(actualUnitPrice), 'actualUnitPrice').to.be.true;
        this._state = 'closed';
    }

    validActualUnitPrice(actualUnitPrice) {
        if (actualUnitPrice > 0) {
            if (this.type === 'bid') return actualUnitPrice <= this.expectUnitPrice;
            if (this.type === 'ask') return actualUnitPrice >= this.expectUnitPrice;
        }
        return false;
    }

    get closeAssetDelta() {
        if (this.type === 'bid') return new AssetDelta(this.expectAmount * (1 - this.feePercent), 0);
        if (this.type === 'ask') return new AssetDelta(0, this.expectTotalPrice * (1 - this.feePercent));
    }
}

module.exports = Order;