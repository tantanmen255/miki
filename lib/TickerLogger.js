'use strict';

const winston = require('winston');
require('winston-daily-rotate-file');

class TickerLogger {
    constructor() {
        /**
         * - level: info for production, otherwise empty.
         * - destination: daily rotation ./log/yyyy-MM-dd.ticker.csv
         * - format: csv
         */
        this.logger = new (winston.Logger)({
            transports: [new (winston.transports.DailyRotateFile)({
                filename: './log/log_ticker.csv',
                datePattern: 'yyyy-MM-dd.',
                prepend: true,
                level: 'info',
                json: false,
                formatter: options => options.message
            })]
        });
    }

    onBroker(broker) {
        this.logger.info(broker.lastTicker.csv);
    }
}

module.exports = TickerLogger;
