'use strict';

const Asset = require('./Asset');

class Agent {
    constructor(market, perceptualMotion = true) {
        this.market = market;
        this._priceHistory = new PriceHistory();
        this.perceptualMotion = perceptualMotion;
    }

    get priceHistory() {
        return this._priceHistory;
    }

    async work() {
        let ticker;
        try {
            ticker = await this.market.fetchTicker();
        } catch (err) {
            console.log(err);
        }

        this._priceHistory.add(ticker.ltp);
        //console.log(ticker.csv);

        const ChronoCrossMarket = require('./ChronoCrossMarket');
        if (this.market instanceof ChronoCrossMarket) {
            if (!this.market.isOpened) {
                this.perceptualMotion = false;
                return;
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

        if (this.perceptualMotion) {
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
