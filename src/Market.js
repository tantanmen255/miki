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
}

module.exports = Market;
