'use strict';

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
        this.json = json;
    }

    getTimeStamp() {
        return this.json.timestamp;
    }

    getBestAsk() {
        return this.json.best_ask;
    }

    getLtp() {
        return this.json.ltp;
    }

    getBestBid() {
        return this.json.best_bid;
    }

    getVolume() {
        return this.json.volume;
    }

    getVolumeByProduct() {
        return this.json.volume_by_product;
    }

    getCsv() {
        return [this.getTimeStamp(), this.getBestAsk(), this.getLtp(), this.getBestBid(), this.getVolume(), this.getVolumeByProduct()].join(',');
    }
}

module.exports = Ticker;
