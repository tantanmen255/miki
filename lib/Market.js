'use strict';

class Market {
    constructor() {

    }

    get isOpened() {
        return true;
    }

    async fetchTicker() {
        throw 'todo';
    }
}

module.exports = Market;
