function testMask(layer, done) {
        var canvas = layer.getMap().getRenderer().canvas;
        var c = new maptalks.Point(canvas.width / 2, canvas.height / 2);
        layer.once('layerload', function () {
            expect(isDrawn(canvas, c.add(-6, 0))).not.to.be.ok();
            expect(isDrawn(canvas, c.add(0, 0))).to.be.ok();
            // expect(layer).not.to.be.painted(-6, 0);
            // expect(layer).to.be.painted(0, 0/* , [0, 0, 0] */);
            layer.once('layerload', function () {
                expect(isDrawn(canvas, c.add(-11, 0))).not.to.be.ok();
                expect(isDrawn(canvas, c.add(0, 0))).to.be.ok();
                // expect(layer).not.to.be.painted(-11, 0);
                // expect(layer).to.be.painted(0, 0, [0, 0, 0]);
                done();
            });
            layer.setMask(new maptalks.Marker(map.getCenter(), {
                'symbol': {
                    'markerType': 'ellipse',
                    'markerWidth': 20,
                    'markerHeight': 20,
                    'markerFill': '#fff',
                    'markerFillOpacity': 1,
                    'markerLineWidth': 3,
                    'markerDy': 5
                }
            }));
            done();
        });
        layer.setMask(new maptalks.Circle(map.getCenter(), 5, {
            symbol: {
                'polygonFill': 'rgba(255, 255, 255, 0.1)'
            }
        }));

    }