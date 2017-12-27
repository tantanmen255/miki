'use strict';

const expect = require('chai').expect;
const {Ticker} = require('../index');

describe('Ticker', () => {
    describe('#constructor()', () => {
        let csv = '2017-12-25T07:01:09.267,1615799,1615796,1614410,115948.20719942,20364.63616284';
        it('should accept json of string', () => {
            let json = {
                timestamp: '2017-12-25T07:01:09.267',
                best_ask: '1615799',
                ltp: '1615796',
                best_bid: '1614410',
                volume: '115948.20719942',
                volume_by_product: '20364.63616284'
            };
            let ticker = new Ticker(json);
            expect(ticker.timestamp).to.be.equal('2017-12-25T07:01:09.267');
            expect(ticker.ltp).to.be.equal(1615796);
            expect(ticker.csv).to.be.equal(csv);
        });

        it('should accept json of int', () => {
            let json = {
                timestamp: '2017-12-25T07:01:09.267',
                best_ask: 1615799,
                ltp: 1615796,
                best_bid: 1614410,
                volume: 115948.20719942,
                volume_by_product: 20364.63616284
            };
            let ticker = new Ticker(json);
            expect(ticker.timestamp).to.be.equal('2017-12-25T07:01:09.267');
            expect(ticker.ltp).to.be.equal(1615796);
            expect(ticker.csv).to.be.equal(csv);
        });
    });
});
