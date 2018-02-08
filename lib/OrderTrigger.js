'use strict';

const expect = require('chai').expect;

class OrderTrigger {
    static immediate() {
        return {
            triggerAble(type, price) {
                return true;
            },
            triggerPrice(type, price) {
                return price;
            }
        };
    }

    static limit(limit) {
        return {
            triggerAble(type, price) {
                return type.isBid ? price <= limit : price >= limit;
            },
            triggerPrice(type, price) {
                expect(this.triggerAble(type, price)).to.be.true;
                return limit;
            }
        };
    }

    static stop(stop) {
        return {
            triggerAble(type, price) {
                return type.isBid ? price >= stop : price <= stop;
            },
            triggerPrice(type, price) {
                expect(this.triggerAble(type, price)).to.be.true;
                return price;
            }
        };
    }
}

module.exports = OrderTrigger;
