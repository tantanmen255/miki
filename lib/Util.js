'use strict';

const readFilePromise = require('fs-readfile-promise');
const csvParse = require('csv-parse/lib/sync');

let Util = Object.create(null);

Util.waitTimeout = async (ms) => {
    return new Promise(resovle => setTimeout(resovle, ms));
};

Util.readCsvFile = async (file, columns = []) => {
    let buffer = await readFilePromise(file);
    let records = csvParse(buffer.toString());
    if (columns.length > 0) {
        let isTargetColumn = (element, index) => columns.indexOf(index) !== -1;
        let toFilteredRow = row => row.filter(isTargetColumn);
        records = records.map(toFilteredRow);
    }
    return records;
}

module.exports = Util;
