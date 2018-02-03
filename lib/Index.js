'use strict';

const expect = require('chai').expect;

class Index {
    constructor(interval) {
        this.a = [];
        this.interval = interval;
        this.period = undefined;
    }

    toString() {
        return this.a.map(x => x.toString()).join('\n');
    }

    toCsv() {
        return this.a.map((x, i) => x.toCsv(i === 0)).join('\n');
    }

    get numberDistance() {
        if (this.a.length === 0) return 0;

        let [first, last] = [this.a[0], this.a[this.a.length - 1]];
        return last.number - first.number;
    }

    add(ticker) {
        if (this.a.length === 0) {
            this.period = new Period(this.interval, ticker.timestamp);
            this.a.push(new IndexUnit(ticker, this.period));
        } else {
            let number = this.period.toNumber(ticker.timestamp);

            let last = this.a[this.a.length - 1];
            if (last.number === number) {
                last.add(ticker);
            } else {
                this.a.push(new IndexUnit(ticker, this.period, last));
            }
        }
    }
}

class Period {
    static toTimestamp(x) {
        if (x instanceof Date) return x.getTime();
        if (typeof x === 'string') return new Date(x).getTime();
        if (typeof x === 'number') return x;
        throw 'invalid x: ' + x.toString();
    }

    constructor(interval, baseTime = new Date('2017-12-15T00:00:00')) {
        this.interval = interval;
        this.zeroBase = this.toBaseTimestamp(baseTime);
    }

    toNumber(x) {
        return (this.toBaseTimestamp(x) - this.zeroBase) / this.interval;
    }

    toBaseTimestamp(x) {
        return Math.floor(Period.toTimestamp(x) / this.interval) * this.interval;
    }

    toBaseISOString(x) {
        return new Date(this.toBaseTimestamp(x)).toISOString();
    }
}

class IndexUnit {
    static get keys() {
        return 'number dateISO open close high low average velocity accelerate'.split(' ');
    }

    constructor(ticker, period, prevUnit) {
        this.a = [];
        this.add(ticker);

        this._number = period.toNumber(ticker.timestamp);
        this._dateISO = period.toBaseISOString(ticker.timestamp);

        this._prevUnit = prevUnit;
    }

    toString() {
        return IndexUnit.keys.map(x => x + ':' + this[x]).join(',');
    }

    toCsv(includeKeys = false) {
        let keys = IndexUnit.keys;
        let values = keys.map(x => this[x]);
        return (includeKeys ? keys.join(',') + '\n' : '') + values.join(',');
    }

    get number() {
        return this._number;
    }

    get dateISO() {
        return this._dateISO;
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
        return Math.round(this.a.reduce((p, c) => p + c, 0) / this.a.length);
    }

    get prevUnit() {
        return this._prevUnit;
    }

    get averageDistance() {
        return this.prevUnit ? this.average - this.prevUnit.average : 0;
    }

    get elapsed() {
        return this.prevUnit ? this.number - this.prevUnit.number : 0;
    }

    get velocity() {
        return this.elapsed ? Math.round(this.averageDistance / this.elapsed) : 0;
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
