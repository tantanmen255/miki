'use strict';

let Util = Object.create(null);

Util.waitTimeout = async (ms) => {
    return new Promise(resovle => setTimeout(resovle, ms));
};

module.exports = Util;
