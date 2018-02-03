'use strict';

const expect = require('chai').expect;

class Index {
    constructor() {
        this.period = new Period(1000);
        this.a = [];
    }

    add (ticker) {
        let number = this.period.toNumber(ticker.timestamp);

        if (this.a.length === 0) {
            this.a.push(new IndexUnit(ticker, number));
        } else {
            let last = this.a[this.a.length - 1];
            if (last.number === number) {
                last.add(ticker);
            } else {
                this.a.push(new IndexUnit(ticker, number, last));
            }
        }
    }
}

class Period {
    static toTimestamp(x) {
        if (x instanceof Date) return x.getTime();
        if (typeof x === "string") return new Date(x).getTime();
        if (typeof x === "number") return x;
        throw "invalid x: " + x.toString();
    }

    constructor(interval, baseTime = new Date("")) {
        this.interval = interval;
        this.zeroBase = this.toBase(baseTime);
    }

    toBase(x) {
        return Math.floor(Period.toTimestamp(x) / this.interval) * this.interval;
    }

    toNumber(x) {
        return this.toBase(x) - this.zeroBase;
    }
}

class IndexUnit {
    constructor(ticker, number, prevUnit) {
        this.a = [];
        this.add(ticker);

        this._number = number;
        this._prevUnit = prevUnit;
    }

    get count() {
        return this.a.length;
    }

    get open() {
        return this.a[0];
    }

    get close() {
        return this.a[this.a.length - 1];
    }

    get closeOpenDiff() {
        return this.close - this.open;
    }

    get high() {
        return this.a.reduce((max, x) => x > max ? x : max);
    }

    get low() {
        return this.a.reduce((min, x) => x < min ? x : min);
    }

    get highLowDiff() {
        return this.high - this.low;
    }

    get average() {
        return this.a.reduce((p, c) => p + c, 0) / this.a.length;
    }

    get number() {
        return this._number;
    }

    get prevUnit() {
        return this._prevUnit;
    }

    get numberDistance() {
        return this.prevUnit ? this.number - this.prevUnit.number : 0;
    }

    get elapsed() {
        return this.prevUnit ? this.number - this.prevUnit.number : 0;
    }

    get velocity() {
        return this.elapsed ? this.numberDistance / this.elapsed : 0;
    }

    get velocityDistance() {
        return this.prevUnit ? this.velocity - this.prevUnit.velocity : 0;
    }

    get accelerate() {
        return this.prevUnit ? this.velocityDistance / this.elapsed : 0;
    }

    add(ticker) {
        this.a.push(ticker.ltp);
    }
}

module.exports = Index;
