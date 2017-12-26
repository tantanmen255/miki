'use strict'

class Market {
    constructor() {

    }

    isOpened() {
        return true;
    }

    async fetchTicker() {
        throw 'todo';
    }

    async requestOrder() {

    }
}

class Order {
    constructor() {
        this.id = 1;
        this.bid = 1;
    }
}

module.exports = Market;
