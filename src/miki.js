'use strict';

class Agent {
    constructor(market) {
        this._market = market;
    }

    work() {
        this._market.fetchPrice().then(price => {
            console.log('current price: ' + price + '');
        }).catch(reason => {
            console.log('failed to fetchPrice.')
        }).then(() => {
            this.work();
        });
    }
}

class Market {
    constructor() {
        this._randomPrice = new RandomPrice(765961, -100, 100);
    }

    fetchPrice() {
        return new Promise((resolve, reject) => {
            this._randomPrice.generate();
            setTimeout((price) => resolve(price), 1000, this._randomPrice.current);
        });
    }
}

function randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

class RandomPrice {
    constructor(current, deltaMin, deltaMax) {
        this._current = current;
        this._deltaMin = deltaMin;
        this._deltaMax = deltaMax;
    }

    get current() {
        return this._current;
    }

    generate() {
        this._current += randomInt(this._deltaMin, this._deltaMax);
        return this;
    }
}

let market = new Market();
let miki = new Agent(market);
miki.work();