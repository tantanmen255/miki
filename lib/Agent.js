'use strict';

const winston = require('winston');
require('winston-daily-rotate-file');
const Asset = require('./Asset');
const expect = require('chai').expect;

class Agent {
    constructor(market, production = false) {
        this.market = market;

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

        this.logger.info(ticker.csv);

        const ChronoCrossMarket = require('./ChronoCrossMarket');
        if (this.market instanceof ChronoCrossMarket) {
            if (!this.market.isOpened) {
                return false;
            }

            let broker = this.market.broker;

            if (broker.orderList.length === 0) {
                // todo
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

module.exports = Agent;
