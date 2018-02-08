'use strict';

const expect = require('chai').expect;

class OrderType {
    static get bid() {
        return this.aBid ? this.aBid : (this.aBid = new OrderType('bid'));
    }

    static get ask() {
        return this.aAsk ? this.aAsk : (this.aAsk = new OrderType('ask'));
    }

    constructor(type) {
        expect(['bid', 'ask']).to.include(type);
        this.type = type;
    }

    toString() {
        return this.type;
    }

    get isBid() {
        return this.type === 'bid';
    }

    get isAsk() {
        return !this.isBid;
    }
}

module.exports = OrderType;
