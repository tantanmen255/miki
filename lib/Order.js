'use strict';

const expect = require('chai').expect;
const AssetDelta = require('./AssetDelta');

class Order {
    constructor(type, amount, trigger) {
        expect(amount).to.be.above(0);

        this._type = type;
        this._amount = amount;
        this._trigger = trigger;
        this._state = 'pending';
    }

    toString() {
        return [this.type.toString(), this.amount, this.trigger.toString()].join(',');
    }

    get type() {
        return this._type;
    }

    get amount() {
        return this._amount;
    }

    get trigger() {
        return this._trigger;
    }

    get state() {
        return this._state;
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

    triggerAble(price) {
        return this.trigger.triggerAble(this.type, price);
    }

    close(price) {
        expect(this.state).to.be.equal('open');
        this._closePrice = this.trigger.triggerPrice(this.type, price);
        this._state = 'closed';
    }

    get closePrice() {
        expect(this.state).to.be.equal('closed');
        return this._closePrice;
    }

    get closeAssetDelta() {
        expect(this.state).to.be.equal('closed');
        return this.type.isBid
            ? new AssetDelta(this.amount, -this.amount * this.closePrice)
            : new AssetDelta(-this.amount, this.amount * this.closePrice);
    }

    reject() {
        expect(this.state).to.be.equal('closed');
        this._state = 'rejected';
    }
}

module.exports = Order;
