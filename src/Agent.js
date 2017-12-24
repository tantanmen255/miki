'use strict';
const util = require('util');

class Agent {
    constructor(market, active = true) {
        this.market = market;
        this.priceHistory = new PriceHistory();
        this.active = active;
    }

    getPriceHistory() {
        return this.priceHistory;
    }

    work() {
        return this.market.fetchTicker().then(ticker => {
            this.priceHistory.add(ticker.getLtp());
            if (this.active) {
                console.log(ticker.getLtp());
                console.log(ticker.getCsv());
            }
        }).catch(reason => {
            console.log(reason);
        }).then(() => {
            if (this.active) {
                this.work();
            }
        });
    }
}

class PriceHistory {
    constructor() {
        this.a = [];
    }

    getCount() {
        return this.a.length;
    }

    getLast() {
        return this.a[this.a.length - 1];
    }

    getAverage() {
        return this.a.reduce((p, c) => p + c, 0) / this.a.length;
    }

    add(price) {
        this.a.push(price);
    }
}

module.exports = Agent;
