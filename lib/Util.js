'use strict';

const fs = require('fs-extra');
const csvParse = require('csv-parse/lib/sync');
const axios = require('axios');
const expect = require('chai').expect;

let Util = Object.create(null);

Util.precisionFloor = (number, precision) => {
    let factor = Math.pow(10, precision);
    return Math.floor(number * factor) / factor;
};

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
    let csvString = await fs.readFile(csvFile);
    return Util.readCsvString(csvString, columns);
};

Util.readCsvString = (csvString, columns) => {
    expect(columns).to.be.an.instanceof(Array).that.length.above(0);
    let records = csvParse(csvString);
    return records.map(row => Util.combine(columns, row));
};

Util.writeString = async (file, string) => {
    await fs.outputFile(file, string);
};

Util.httpGet = async (url) => {
    let res;
    try {
        res = await axios({
            url: url,
            validateStatus: status => status === 200
        });
    } catch (error) {
        let message;
        if (error.response) {
            message = 'invalid response with status ' + error.response.status;
        } else if (error.request) {
            message = 'no response.';
        } else {
            message = 'failed to setup request, ' + error.message;
        }
        throw 'httpGet error: ' + message + '.';
    }

    return res.data;
};

module.exports = Util;
