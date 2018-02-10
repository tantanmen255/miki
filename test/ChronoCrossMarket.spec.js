'use strict';

const expect = require('chai').expect;
const {Agent, ChronoCrossMarket, Ticker, Util, Order, OrderType, OrderTrigger} = require('../index');

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
            expect(market.isOpened, 'market.isOpened').to.be.true;

            let agent = new Agent(market);
            expect(agent.broker.asset.coin).to.be.equal(0);
            expect(agent.broker.asset.currency).to.be.equal(1000000);
            expect(agent.broker.orderList).to.have.length(0);

            await agent.broker.requestOpenOrder(
                new Order(OrderType.bid, 0.11, OrderTrigger.limit(1670000))
            );
            expect(agent.broker.asset.coin).to.be.equal(0);
            expect(agent.broker.asset.currency).to.be.equal(1000000);
            expect(agent.broker.orderList).to.have.length(1);

            await agent.work();
            expect(agent.broker.asset.coin).to.be.equal(0.11);
            expect(agent.broker.asset.currency).to.be.equal(1000000 - 0.11 * 1670000);
            expect(agent.broker.orderList).to.have.length(0);

            await agent.broker.requestOpenOrder(
                new Order(OrderType.ask, 0.1, OrderTrigger.limit(1650000))
            );
            expect(agent.broker.asset.coin).to.be.equal(0.11);
            expect(agent.broker.asset.currency).to.be.equal(1000000 - 0.11 * 1670000);
            expect(agent.broker.orderList).to.have.length(1);

            await agent.work();
            expect(agent.broker.asset.coin).to.be.equal(0.11 - 0.1);
            expect(agent.broker.asset.currency).to.be.equal(1000000 - 0.11 * 1670000 + 0.1 * 1650000);
            expect(agent.broker.orderList).to.have.length(0);
        });
    });
});
