'use strict';

class RandomMarket {
    constructor() {
        this.randomPrice = new RandomPrice(765961, -100, 100);
    }

    fetchPrice() {
        return new Promise((resolve, reject) => {
            this.randomPrice.generate();
            setTimeout(price => resolve(price), 1, this.randomPrice.current);
        });
    }

    buy(orderId, buyPrice) {
        return new Promise((resolve, reject) => {
            setTimeout(res => resolve(res), 1, 'ok');
        });
    }

    sell(orderId, sellPrice) {
        return new Promise((resolve, reject) => {
            setTimeout(res => resolve(res), 1, 'ok');
        });
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

module.exports = {
    RandomMarket: RandomMarket
};
