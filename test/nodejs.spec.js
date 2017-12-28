'use strict';

const expect = require('chai').expect;

describe('nodejs', () => {
    describe('#Array', () => {
        it('should support foreach remove after fitler', () => {
            let a = [1, 2, 3, 4, 5];
            a.filter(x => x % 2 === 0).forEach(x => a.splice(a.indexOf(x), 1));
            expect(a).to.have.same.members([1, 5, 3]);
            expect(a).to.have.same.ordered.members([1, 3, 5]);
            expect(a).to.not.have.same.members([1, 3]);
        });
    });
});
