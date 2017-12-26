'use strict';

class Agent {
    constructor(market, active = true) {
        this.market = market;
        this._priceHistory = new PriceHistory();
        this.active = active;
    }

    get priceHistory() {
        return this._priceHistory;
    }

    async work() {
        try {
            let ticker = await this.market.fetchTicker();

            this._priceHistory.add(ticker.getLtp());

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

class Asset {
    constructor(currency = 0, coin = 0) {
        this._currency = currency;
        this._coin = coin;
        this._orderList = [];
    }

    get currency() {
        return this._currency;
    }

    set currency(value) {
        this._currency = value;
    }

    get coin() {
        return this._coin;
    }

    set coin(value) {
        this._coin = value;
    }

    get orderList() {
        return this._orderList;
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
