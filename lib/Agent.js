'use strict';

const winston = require('winston');
require('winston-daily-rotate-file');
const Asset = require('./Asset');

class Agent {
    constructor(market, production = false) {
        this.market = market;
        this._priceHistory = new PriceHistory();

        let level = production ? 'info' : 'error';
        let transport = new (winston.transports.DailyRotateFile)({
            filename: './log/log_ticker.csv',
            datePattern: 'yyyy-MM-dd.',
            prepend: true,
            level: level,
            json: false,
            formatter: options => options.message
        });
        let logger = new (winston.Logger)({
            transports: [transport]
        });
        /**
         * - level: info for production, otherwise empty.
         * - destination: daily rotation ./log/yyyy-MM-dd.ticker.csv
         * - format: csv
         */
        this.logger = logger;
    }

    get priceHistory() {
        return this._priceHistory;
    }

    async work() {
        if (!this.market.isOpened) {
            return false;
        }

        let ticker;
        try {
            ticker = await this.market.fetchTicker();
        } catch (err) {
            console.error(err);
            return false;
        }

        this._priceHistory.add(ticker.ltp);
        this.logger.info(ticker.csv);

        const ChronoCrossMarket = require('./ChronoCrossMarket');
        if (this.market instanceof ChronoCrossMarket) {
            if (!this.market.isOpened) {
                return false;
            }

            let broker = this.market.broker;
            if (broker.orderList.length === 0) {
                if (broker.asset.coin < 0.01) {
                    await broker.requestOpenOrder('bid', 0.011, 1620000);
                } else {
                    await broker.requestOpenOrder('ask', 0.01, 1630000);
                }
            } else {
                // do nothing
            }
        }

        return true;
    }

    async keepWorking() {
        while (true) {
            await this.work();
        }
    }
}

class PriceHistory {
    constructor() {
        this.a = [];
    }

    get count() {
        return this.a.length;
    }

    get last() {
        return this.a[this.a.length - 1];
    }

    get average() {
        return this.a.reduce((p, c) => p + c, 0) / this.a.length;
    }

    add(price) {
        this.a.push(price);
    }
}

module.exports = Agent;
