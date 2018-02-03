'use strict';

const expect = require('chai').expect;
const {Index, Ticker} = require('../index');

describe('Index', () => {
    describe('#constructor()', () => {
        let csv = '2018-01-30T00:00:01.807,1218143,1218127,1218127,96471.5247902,13045.30983454\n' +
            '2018-01-30T00:00:02.823,1218143,1218143,1218142,96472.2867902,13045.31083454\n' +
            '2018-01-30T00:00:03.887,1218143,1218127,1218127,96472.2470902,13045.32583454\n' +
            '2018-01-30T00:00:05.45,1218143,1218110,1218110,96472.84909052,13046.43783498\n' +
            '2018-01-30T00:00:05.903,1218110,1218110,1218000,96472.80081989,13047.20656435';
        it('should accept ticker', () => {
            let index = new Index(1000);

            csv.split('\n').slice(0, 1).forEach(x => index.add(new Ticker(x)));
            expect(index.toString()).to.be.equal('number:0,dateISO:2018-01-29T15:00:01.000Z,open:1218127,close:1218127,high:1218127,low:1218127,average:1218127,velocity:0,accelerate:0');
        });
    });
});
