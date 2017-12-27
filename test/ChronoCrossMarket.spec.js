'use strict';

const expect = require('chai').expect;
const {ChronoCrossMarket, Ticker, Util} = require('../index');

describe('ChronoCrossMarket', () => {
    describe('#constructor()', () => {
        it('should works', async () => {
            let csvString = `2017-12-25T13:05:14.22,1669521,1668929,1668929,99789.88953,17386.18044
                             2017-12-25T13:05:14.783,1669521,1668929,1668929,99788.71058,17385.36854
                             2017-12-25T13:05:16.023,1669881,1668929,1668929,99790.58357,17385.38453
                             2017-12-25T13:05:17.037,1669881,1668929,1668929,99793.36409,17385.21412
                             2017-12-25T13:05:18.57,1669136,1669136,1668929,99792.00201,17383.88355
                             2017-12-25T13:05:19.007,1669136,1669136,1668929,99791.43748,17383.42962`;
            let jsonArray = Util.readCsvString(csvString, Ticker.keys);
            let market = new ChronoCrossMarket(jsonArray);
            expect(market.isOpened).to.be.true;

            expect(market.asset.coin).to.be.equal(0);
            expect(market.asset.currency).to.be.equal(1000000);
            expect(market.asset.orderList).to.have.length(0);

            market.requestOpenOrder('bid', 0.11, 1670000);
            expect(market.asset.coin).to.be.equal(0);
            expect(market.asset.currency).to.be.equal(1000000 - 0.11 * 1670000);
            expect(market.asset.orderList).to.have.length(1);

            await market.fetchTicker();
            expect(market.asset.coin).to.be.equal(0.11 * (1 - 0.0015));
            expect(market.asset.currency).to.be.equal(1000000 - 0.11 * 1670000);
            expect(market.asset.orderList).to.have.length(0);

            market.requestOpenOrder('ask', 0.1, 1650000);
            expect(market.asset.coin).to.be.equal(0.11 * (1 - 0.0015) - 0.1);
            expect(market.asset.currency).to.be.equal(1000000 - 0.11 * 1670000);
            expect(market.asset.orderList).to.have.length(1);

            await market.fetchTicker();
            market.requestOpenOrder('ask', 0.1, 1650000);
            expect(market.asset.coin).to.be.equal(0.11 * (1 - 0.0015) - 0.1);
            expect(market.asset.currency).to.be.equal(1000000 - 0.11 * 1670000 + 0.1 * 1650000 * (1 - 0.0015));
            expect(market.asset.orderList).to.have.length(0);
        });
    });
});
