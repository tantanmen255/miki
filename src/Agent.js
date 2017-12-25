'use strict';

class Agent {
    constructor(market, active = true) {
        this.market = market;
        this.priceHistory = new PriceHistory();
        this.active = active;
    }

    getPriceHistory() {
        return this.priceHistory;
    }

    async work() {
        try {
            let ticker = await this.market.fetchTicker();

            this.priceHistory.add(ticker.getLtp());
            if (this.active) {
                console.log(ticker.getCsv());
            }
        } catch (err) {
            console.log(err);
        }

        if (this.active) {
            this.work();
        }
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
