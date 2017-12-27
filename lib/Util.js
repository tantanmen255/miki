'use strict';

const readFilePromise = require('fs-readfile-promise');
const csvParse = require('csv-parse/lib/sync');
const expect = require('chai').expect;

let Util = Object.create(null);

Util.wait = async (ms) => {
    if (ms <= 0) return;
    return new Promise(resovle => setTimeout(resovle, ms));
};

Util.Limiter = class Limiter {
    constructor(interval) {
        expect(interval).to.be.least(0);
        this._interval = interval;
        this.lastRequest = null;
    }

    get interval() {
        return this._interval;
    }

    async wait() {
        if (this.lastRequest !== null) {
            let now = new Date();
            let pastTime = now.getTime() - this.lastRequest.getTime();
            let remainTime = this.interval - pastTime;
            await Util.wait(remainTime);
        }
        this.lastRequest = new Date();
    }
};

Util.combine = (keys, values) => {
    expect(keys).to.be.an.instanceof(Array);
    expect(values).to.be.an.instanceof(Array);
    expect(keys.length).to.be.equal(values.length);
    return values.reduce((json, value, index) => (json[keys[index]] = value, json), {});
};

Util.readCsvFile = async (csvFile, columns) => {
    let buffer = await readFilePromise(csvFile);
    return Util.readCsvString(buffer.toString(), columns);
};

Util.readCsvString = (csvString, columns) => {
    expect(columns).to.be.an.instanceof(Array).that.length.above(0);
    let records = csvParse(csvString);
    return records.map(row => Util.combine(columns, row));
};

module.exports = Util;
