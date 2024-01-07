function testDrag(geo) {
                return function () {
                    if (geo instanceof maptalks.GeometryCollection || geo instanceof maptalks.Sector) {
                        //not fit for geometry collection's test.
                        return;
                    }
                    layer.addGeometry(geo);
                    geo.startEdit();
                    var center = geo.getCenter();
                    dragGeometry(geo);
                    expect(geo.getCenter()).not.to.closeTo(center);
                    //geo can only be dragged by center handle.
                    var newCenter = geo.getCenter();
                    dragGeometry(geo, new maptalks.Point(500, 20));
                    if (!(geo instanceof maptalks.Marker) || geo._canEdit()) {
                        expect(geo.getCenter()).to.closeTo(newCenter);
                        geo.undoEdit();
                        var c = geo.getCenter();
                        expect(c.x).to.be.approx(center.x, 1E-4);
                        expect(c.y).to.be.approx(center.y, 1E-4);
                        geo.redoEdit();
                        expect(geo.getCenter()).to.closeTo(newCenter);
                        geo.cancelEdit();
                        var c = geo.getCenter();
                        expect(c.x).to.be.approx(center.x, 1E-4);
                        expect(c.y).to.be.approx(center.y, 1E-4);
                    }
                    geo.endEdit();
                };
            }