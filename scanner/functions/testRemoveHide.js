function testRemoveHide(geometry, _context) {


    var type = geometry.getType();
    context('Type of ' + type + ' geometry', function () {
        it('should be removed', function (done) {
            test(geometry, _context, function () {
                geometry.remove();
            }, done);
        });


        it('should be removed by layer', function (done) {
            test(geometry, _context, function () {
                _context.layer.removeGeometry(geometry);
            }, done);
        });

        it('should be cleared by layer', function (done) {
            test(geometry, _context, function () {
                _context.layer.clear();
            }, done);
        });

        it('should be hided with layer', function (done) {
            test(geometry, _context, function () {
                _context.layer.hide();
            }, done);
        });

        it('should be removed with layer', function (done) {
            test(geometry, _context, function () {
                _context.layer.remove();
            }, done);
        });

        it('should be removed with layer by map', function (done) {
            test(geometry, _context, function () {
                var map = _context.layer.getMap();
                map.removeLayer(_context.layer);
            }, done);
        });

        it('should be hided', function (done) {
            test(geometry, _context, function () {
                geometry.hide();
            }, done);
        });


        it('should be removed when it is being edited', function (done) {
            setupGeometry(geometry);
            var layer = _context.layer,
                map = layer.getMap();
            layer.config('drawImmediate', true);
            layer.clear();
            map.setCenter(geometry.getFirstCoordinate());
            if (!(geometry instanceof maptalks.Marker) && !(geometry instanceof maptalks.MultiPoint)) {
                geometry.setSymbol({
                    'lineWidth': 5,
                    'lineColor': '#000000',
                    'lineOpacity': 1,
                    'polygonFill': '#000000',
                    'polygonOpacity': 1
                });
            } else {
                geometry.setSymbol({
                    'markerType': 'pie',
                    'markerHeight': 24,
                    'markerWidth': 24,
                    'markerFill': '#de3333',
                    'markerLineColor': '#ffffff',
                    'markerLineWidth': 1,
                    'opacity': 1
                });
            }
            var testPoints = getTestPoints(geometry, _context);
            layer.addGeometry(geometry);
            geometry.startEdit();
            setTimeout(function () {
                if (layer.isEmpty()) {
                    return;
                }
                expect(isDrawn(testPoints, _context.container)).to.be.ok();
                layer.on('layerload', function () {
                    if (layer.isEmpty()) {
                        expect(isDrawn(testPoints, _context.container)).not.to.be.ok();
                        layer._clearListeners();
                        done();
                    }
                });
                setTimeout(function () {
                    //layer throws layerload event right after editLayer in current frame
                    //remove the geometry in the next frame
                    geometry.remove();
                }, 1);
            }, 40);
        });
    });
}