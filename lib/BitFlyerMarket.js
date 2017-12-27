'use strict';

const axios = require('axios');
const Market = require('./Market');
const Ticker = require('./Ticker');
const Util = require('./Util');

class BitFlyerMarket extends Market {
    constructor(requestInterval = 125) {
        super();
        /**
         * API Limits
         * - The private API is limited to approx. 200 queries per minute
         * - Each IP address is limited to approx. 500 queries per minute
         */
        this.limiter = new Util.Limiter(Math.max(125, requestInterval));
    }

    async fetchTicker() {
        await this.limiter.wait();

        let res = await axios({
            url: 'https://api.bitflyer.jp/v1/getticker',
            validateStatus: status => status === 200
        });
        // throw err

        return new Ticker(res.data);
    }

    async buy(price) {
        await Util.wait(0);
        throw 'error: todo';
    }

    async sell(orderId, price) {
        await Util.wait(0);
        throw 'error: todo';
    }
}

module.exports = BitFlyerMarket;
