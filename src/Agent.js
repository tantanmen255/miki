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
        return this.market.fetchPrice().then(price => {
            this.priceHistory.add(price);
        }).catch(reason => {
            console.log('failed to fetchPrice.');
        }).then(() => {
            if (this.active) {
                this.work();
            }
            ;
        });
    }
}

// fetch and save price
// idle: if trend.isUp: buy(), state=hold
// hold: upaate sellAtPrice. if price < sellAtPrice, sell(), state=hold

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

module.exports = {
    Agent: Agent
};