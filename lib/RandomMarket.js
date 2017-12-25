'use strict';

const Market = require('./Market');
const Ticker = require('./Ticker');
const Util = require('./Util');

class RandomMarket extends Market {
    constructor() {
        super();
        this.randomTicker = new RandomTicker(new RandomPrice(765961, -100, 100));
    }

    async fetchTicker() {
        await Util.waitTimeout(1);

        return this.randomTicker.generate().getCurrent();
    }
}

function randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

class RandomPrice {
    constructor(current, deltaMin, deltaMax) {
        this.current = current;
        this.deltaMin = deltaMin;
        this.deltaMax = deltaMax;
    }

    getCurrent() {
        return this.current;
    }

    generate() {
        this.current += randomInt(this.deltaMin, this.deltaMax);
        return this;
    }
}

class RandomTicker {
    constructor(randomPrice) {
        this.randomPrice = randomPrice;
    }

    getCurrent() {
        let currentPrice = this.randomPrice.getCurrent();
        let json = {
            timestamp: 'timestamp',
            best_ask: currentPrice + 1,
            ltp: currentPrice,
            best_bid: currentPrice - 1,
            volume: 7725,
            volume_by_product: 5277
        };
        return new Ticker(json);
    }

    generate() {
        this.randomPrice.generate();
        return this;
    }
}

module.exports = RandomMarket;
