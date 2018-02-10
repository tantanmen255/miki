'use strict';

const Broker = require('./Broker');
const Asset = require('./Asset');

class Agent {
    constructor(market, strategy = new OstrichAlgorithm()) {
        this.market = market;
        this._broker = new Broker(new Asset(0, 1000000, []), []);
        this.strategy = strategy;
    }

    get broker() {
        return this._broker;
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

        this._broker.updateInfo(ticker);

        this.strategy.onBroker(this._broker);

        return true;
    }

    async perceptualMotionDream() {
        while (true) {
            await this.work();
        }
    }
}

class OstrichAlgorithm {
    constructor() {
    }

    onBroker(broker) {
    }
}

module.exports = Agent;
