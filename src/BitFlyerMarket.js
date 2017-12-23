'use strict';

const request = require('request');

class BitFlyerMarket {
    constructor(requestInterval = 500) {
        /*
        API Limits
        - The private API is limited to approx. 200 queries per minute
        - Each IP address is limited to approx. 500 queries per minute
        */
        this.requestInterval = Math.max(500, requestInterval);
    }

    fetchPrice() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let path = '/v1/getticker';
                let query = '';
                let url = 'https://api.bitflyer.jp' + path + query;
                let options = {
                    url: url,
                    json: true
                };
                request(options, function (err, response, body) {
                    if (response.statusCode === 200) {
                        resolve(body.ltp);
                    } else {
                        reject(err);
                    }
                });
            }, this.requestInterval);
        });
    }

    buy(orderId, buyPrice) {
        return new Promise((resolve, reject) => {
            setTimeout(res => resolve(res), 1, 'error: todo');
        });
    }

    sell(orderId, sellPrice) {
        return new Promise((resolve, reject) => {
            setTimeout(res => resolve(res), 1, 'error: todo');
        });
    }
}

module.exports = {
    BitFlyerMarket: BitFlyerMarket
};
