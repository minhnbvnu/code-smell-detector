function onMouseOver(param) {
            if (count === 0) {
                expect(param.type).to.be.eql('mouseenter');
            } else {
                expect(param.type).to.be.eql('mouseover');
            }
            expect(param.target === circle).to.be.ok();
            count++;
            if (count === 3) {
                done();
            }
        }