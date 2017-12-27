'use strict';

const expect = require('chai').expect;
const {Util} = require('../index');

describe('Util', () => {
    describe('#combine()', () => {
        it('should combine keys and values into object', () => {
            let result = Util.combine(['a', 'b'], [1, 2]);
            expect(result).to.have.property('a').that.equal(1);
            expect(result).to.have.property('b').that.equal(2);
        });
    });
});
