// var utils = require('../SpecUtils.js');

describe('Spec of Masks', function () {

    var container;
    var map;
    var center = new maptalks.Coordinate(118.846825, 32.046534);
    var context = {
    };

    function createRing(offset) {
        var center = map.getCenter();
        var x = center.x, y = center.y;
        var minx = x - offset, maxx = x + offset, miny = y - offset, maxy = y + offset;
        return [
            [minx, miny],
            [minx, maxy],
            [maxx, maxy],
            [maxx, miny],
            [minx, miny]
        ];
    }

    beforeEach(function () {
        container = document.createElement('div');
        container.style.width = '150px';
        container.style.height = '150px';
        document.body.appendChild(container);
        var option = {
            centerCross: true,
            zoom: 17,
            center: center
        };
        map = new maptalks.Map(container, option);
        context.map = map;
    });

    afterEach(function () {
        map.remove();
        REMOVE_CONTAINER(container);
    });

    function isDrawn(canvas, p) {
        var context = canvas.getContext('2d');
        var imgData = context.getImageData(p.x, p.y, 1, 1).data;
        if (imgData[3] > 0) {
            return true;
        }
        return false;
    }

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

    var tileLayer = new maptalks.TileLayer('tile', {
        urlTemplate: TILE_IMAGE,
        renderer: 'canvas'
    });
    //test tilelayer
    runTests(tileLayer, context);

    //test vectorlayer
    var vlayer = new maptalks.VectorLayer('v').addGeometry(new maptalks.Circle(center, 2000, {
        symbol: {
            'polygonFill': 'rgba(0, 0, 0, 0.1)',
            'polygonOpacity': 1
        }
    }));

    runTests(vlayer, context);

    function runTests(layerToTest, context) {
        describe('layer', function () {
            beforeEach(function () {
                context.map.addLayer(layerToTest);
            });

            afterEach(function () {
                context.map.removeLayer(layerToTest);
            });

            it('can set mask,' + layerToTest.getJSONType(), function (done) {
                layerToTest.once('layerload', function () {
                    expect(layerToTest).to.be.painted(-20, 0);
                    testMask(layerToTest, done);
                });
            });

            it('can remove mask,' + layerToTest.getJSONType(), function (done) {
                layerToTest.setMask(new maptalks.Marker(map.getCenter(), {
                    'symbol': {
                        'markerType': 'ellipse',
                        'markerWidth': 10,
                        'markerHeight': 10,
                        'markerFill': '#000',
                        'markerFillOpacity': 1
                    }
                }));
                setTimeout(function () {
                    layerToTest.removeMask();
                    setTimeout(function () {
                        expect(layerToTest).to.be.painted(-40, 0);
                        expect(layerToTest).to.be.painted(-20, 0);
                        expect(layerToTest).to.be.painted();
                        done();
                    }, 50);
                }, 50);
            });

            it('zoom with mask,' + layerToTest.getJSONType(), function (done) {
                if (layerToTest === tileLayer) {
                    done();
                    return;
                }
                layerToTest.once('layerload', function () {
                    var zoomed = false;
                    layerToTest.on('layerload', function () {
                        if (zoomed) {
                            // expect(layer).not.to.be.painted(-11, 0);
                            expect(layerToTest).to.be.painted(0, 0, [0, 0, 0]);
                            done();
                        }
                    });
                    testMask(layerToTest, function () {
                        zoomed = true;
                        context.map.zoomIn();
                    });
                });
            });
        });
    }

    it('#713', function (done) {
        vlayer.setMask(new maptalks.Marker(map.getCenter(), {
            'symbol': {
                'markerType': 'ellipse',
                'markerWidth': 10,
                'markerHeight': 10,
                'markerFill': '#000',
                'markerFillOpacity': 1
            }
        }));
        map.addLayer(vlayer);
        var canvas = vlayer.getMap().getRenderer().canvas;
        var c = new maptalks.Point(canvas.width / 2, canvas.height / 2);
        vlayer.once('layerload', function () {
            map.removeLayer(vlayer);
            vlayer.once('layerload', function () {
                expect(isDrawn(canvas, c.add(-11, 0))).not.to.be.ok();
                expect(isDrawn(canvas, c.add(0, 0))).to.be.ok();
                done();
            });
            map.addLayer(vlayer);
        });
    });

    it('mask of MultiPolygon', function (done) {
        vlayer.setMask(new maptalks.MultiPolygon([
            new maptalks.Circle(map.getCenter(), 5).getShell(),
            new maptalks.Circle(map.locate(map.getCenter(), 10, 0), 5).getShell()
        ]));
        map.addLayer(vlayer);
        var canvas = vlayer.getMap().getRenderer().canvas;
        var c = new maptalks.Point(canvas.width / 2, canvas.height / 2);
        vlayer.once('layerload', function () {
            expect(isDrawn(canvas, c.add(-11, 0))).not.to.be.ok();
            expect(isDrawn(canvas, c.add(0, 0))).to.be.ok();
            done();
        });
    });

    it('mask with Layer.toJSON', function (done) {
        vlayer.setMask(new maptalks.MultiPolygon([
            new maptalks.Circle(map.getCenter(), 5).getShell(),
            new maptalks.Circle(map.locate(map.getCenter(), 10, 0), 5).getShell()
        ]));
        // map.addLayer(vlayer);
        var json = vlayer.toJSON();
        var layer2 = maptalks.Layer.fromJSON(json).addTo(map);
        var canvas = layer2.getMap().getRenderer().canvas;
        var c = new maptalks.Point(canvas.width / 2, canvas.height / 2);
        layer2.once('layerload', function () {
            expect(isDrawn(canvas, c.add(-11, 0))).not.to.be.ok();
            expect(isDrawn(canvas, c.add(0, 0))).to.be.ok();
            done();
        });
    });

    it('mask can return extent', function () {
        var mask = new maptalks.MultiPolygon([
            new maptalks.Circle(map.getCenter(), 5).getShell(),
            new maptalks.Circle(map.locate(map.getCenter(), 10, 0), 5).getShell()
        ]);
        var tileLayer = new maptalks.TileLayer('tile', {
            urlTemplate: TILE_IMAGE,
            renderer: 'canvas'
        });
        tileLayer.setMask(mask);
        map.addLayer(tileLayer);
        var extent = mask._getMaskPainter().get2DExtent();
        expect(extent.xmin).to.be.ok();
        expect(extent.ymin).to.be.ok();
    });

    it('mask has hole', function () {
        var layer = new maptalks.VectorLayer('layer').addTo(map);
        new maptalks.Marker(map.getCenter().toArray()).addTo(layer);
        var ring = createRing(0.2), hole = createRing(0.1);
        var polygon = new maptalks.Polygon([ring, hole]);
        map.once('frameend', function () {
            expect(layer).to.be.painted(0, 0);
            layer.setMask(polygon);
            map.once('frameend', function () {
                expect(layer).to.be.painted(0, 0);
            })
        })
    });

});
