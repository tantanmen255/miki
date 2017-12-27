'use strict';

const expect = require('chai').expect;
const Util = require('./util');

class Ticker {
    /**
     *{
     *  "product_code": "BTC_JPY",
     *  "timestamp": "2015-07-08T02:50:59.97",
     *  "tick_id": 3579,
     *  "best_bid": 30000, //jpy
     *  "best_ask": 36640, //jpy
     *  "best_bid_size": 0.1, //btc, may be ignored for 0.01 trade
     *  "best_ask_size": 5, //btc, may be ignored for 0.01 trade
     *  "total_bid_depth": 15.13, //?, may be ignored for 0.01 trade
     *  "total_ask_depth": 20, //?, may be ignored for 0.01 trade
     *  "ltp": 31690, //jpy
     *  "volume": 16819.26, //?
     *  "volume_by_product": 6819.26 //?
     *}
     */
    constructor(json) {
        let keys = Ticker.keys;

        keys.forEach(key => expect(json).to.have.property(key));
        let parse = (key, value) => key === 'timestamp' ? value : Number.parseFloat(value);
        let values = keys.map(key => parse(key, json[key]));

        this.json = Util.combine(keys, values);
    }

    static get keys() {
        return this._keys || (this._keys = 'timestamp best_ask ltp best_bid volume volume_by_product'.split(' '));
    }

    get timestamp() {
        return this.json['timestamp'];
    }

    get best_ask() {
        return this.json['best_ask'];
    }

    get ltp() {
        return this.json['ltp'];
    }

    get best_bid() {
        return this.json['best_bid'];
    }

    get volume() {
        return this.json['volume'];
    }

    get volume_by_product() {
        return this.json['volume_by_product'];
    }

    get csv() {
        return Object.values(this.json).join(',');
    }
}

module.exports = Ticker;
