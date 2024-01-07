function step(frame) {
                if (frame.state.playState === 'running' || frame.state.playState === 'finished') {
                    var p = map.getSize().toPoint().multi(1 / 2);
                    expect(isDrawn(map.getRenderer().canvas, p)).to.be.ok();
                }
                if (frame.state.playState !== 'finished') {
                    return;
                }
                var expected = center.add(new maptalks.Coordinate(0.1, 0.1));
                expect(marker.getCenter()).to.closeTo(expected);
                expect(map.getCenter()).to.closeTo(expected);
                done();
            }