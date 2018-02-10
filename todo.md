# miki

0.prepare 2h
- [x] setup: 2h

1.fetch 10h
- [x] Agent, RandomMarket: 2.5h
- [x] BitflyerMarket: 2h
- [x] Ticker: 2h
- [x] refactor: await&async, axios, module. 1.5h

- bug: redirect output failed after an exception thrown 0.5h
- [x] a logger support file rolling: winston 1.5h

2.virtual trade 12h
- [x] ChronoCrossMarket 2h
- [x] trade 2h
- [x] refactor: Ticker, Util, Limiter 1.5h
- [x] refactor: Order, ChronoCrossMarket 3.5h
- [x] refactor: test 1h
- [x] refactor: AssetDelta 1h
- [x] refactor: Broker 0.5h
- [x] refactor: Agent 0.5h

3.technical analyze
- [x] index 2h
- [x] analyze 0.5h

- [x] parse index logs: date.log -> date.index.1s/2s/4s.log 1h
- analyze: index logs of v, a, ltp-delta. 1h

- [x] refactor: advanced order 2h
- [x] refactor: broker&order 0.8h
- [x] refactor: agent&strategy 0.5h
- [x] refactor: move broker into agent 0.5h

- [ ] OpenEyeBlind: if 1000 ticker passed, buy/sell at ltp.
- [ ] strategy test: log + strategy -> benefit%, order history.
- analyze: serious strategy 0.5h

4.serious client
- [ ] websocket ticker
- [ ] auth, order
- [ ] html ui