'use strict';

const Broker = require('./Broker');
const Asset = require('./Asset');

class Agent {
    constructor(market, decisionMaker = new OstrichAlgorithm()) {
        this.market = market;
        this._broker = new Broker(new Asset(0, 2000000, []), []);
        this.decisionMaker = decisionMaker;
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

        await this.decisionMaker.onBroker(this._broker);

        return true;
    }

    async workToday() {
        while (this.market.isOpened) {
            await this.work();
        }
    }

    async workForever() {
        while (true) {
            await this.work();
        }
    }
}

class OstrichAlgorithm {
    constructor() {
    }

    async onBroker(broker) {
    }
}

module.exports = Agent;
