'use strict';

const Asset = require('./Asset');

class Agent {
    constructor(market, active = true, logEnabled = true) {
        this.market = market;
        this._priceHistory = new PriceHistory();
        this.active = active;
        this.logEnabled = logEnabled;
    }

    get priceHistory() {
        return this._priceHistory;
    }

    log(message) {
        if (this.logEnabled) {
            console.log(message);
        }
    }

    async work() {
        let ticker;
        try {
            ticker = await this.market.fetchTicker();
        } catch (err) {
            console.log(err);
        }

        this._priceHistory.add(ticker.ltp);
        this.log(ticker.csv);

        const ChronoCrossMarket = require('./ChronoCrossMarket');
        if (this.market instanceof ChronoCrossMarket) {
            if (!this.market.isOpened) {
                this.active = false;
                return;
            }

            let asset = this.market.asset;
            if (asset.orderList.length === 0) {
                if (asset.coin < 0.009) {
                    await this.market.requestOpenOrder('bid', 0.01, 1620000);
                } else {
                    await this.market.requestOpenOrder('ask', 0.01, 1630000);
                }
            } else {
                // do nothing
            }
        }

        if (this.active) {
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
