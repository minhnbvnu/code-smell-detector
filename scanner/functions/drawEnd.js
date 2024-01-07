function drawEnd(param) {
                expect(param.geometry instanceof maptalks.Ellipse).to.be.ok();
                expect(param.geometry.getWidth()).to.above(0);
                expect(param.geometry.getHeight()).to.above(0);
                done();
            }