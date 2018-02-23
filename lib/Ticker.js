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
    constructor(jsonOrString) {
        let values;
        if (typeof jsonOrString === 'string') {
            values = jsonOrString.split(',');
            this.json = Util.combine(Ticker.keys, values);
        } else {
            this.json = jsonOrString;
        }
    }

    static get keys() {
        return Ticker._keys || (Ticker._keys = 'timestamp best_ask ltp best_bid volume volume_by_product'.split(' '));
    }

    get timestamp() {
        return this.json['timestamp'];
    }

    get best_ask() {
        return Number.parseFloat(this.json['best_ask']);
    }

    get ltp() {
        return Number.parseFloat(this.json['ltp']);
    }

    get best_bid() {
        return Number.parseFloat(this.json['best_bid']);
    }

    get volume() {
        return Number.parseFloat(this.json['volume']);
    }

    get volume_by_product() {
        return Number.parseFloat(this.json['volume_by_product']);
    }

    get csv() {
        return Object.values(this.json).join(',');
    }
}

module.exports = Ticker;
