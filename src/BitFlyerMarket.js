'use strict';

const request = require('request');
const Ticker = require('./Ticker');

class BitFlyerMarket {
    constructor(requestInterval = 500) {
        /**
         * API Limits
         * - The private API is limited to approx. 200 queries per minute
         * - Each IP address is limited to approx. 500 queries per minute
         */
        this.requestInterval = Math.max(500, requestInterval);
    }

    fetchTicker() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let options = {
                    url: 'https://api.bitflyer.jp/v1/getticker',
                    json: true
                };
                request(options, (err, response, body) => {
                    if (response.statusCode === 200) {
                        resolve(new Ticker(body));
                    } else {
                        reject(err);
                    }
                });
            }, this.requestInterval);
        });
    }

    buy(price) {
        return new Promise((resolve, reject) => {
            setTimeout(res => resolve(res), 1, 'error: todo');
        });
    }

    sell(orderId, price) {
        return new Promise((resolve, reject) => {
            setTimeout(res => resolve(res), 1, 'error: todo');
        });
    }
}

module.exports = BitFlyerMarket;
