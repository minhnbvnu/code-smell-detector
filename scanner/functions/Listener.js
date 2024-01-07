function listener(param) {
                expect(param.coordinate).to.be.ok();
                expect(param.containerPoint).to.be.ok();
                expect(param.viewPoint).to.be.ok();
                expect(param.point2d).to.be.ok();
                expect(param.target).to.be.ok();
                expect(param.type).to.be.ok();
                done();
            }