function testStyle(style, hitIndex, symbols) {
            layer.clear();
            var points = [
                new maptalks.Marker([0, 0], {
                    properties : {
                        'foo1' : 1,
                        'foo2' : 'test1',
                        'foo3' : true
                    }
                }),
                new maptalks.Marker([0, 0], {
                    properties : {
                        'foo1' : 2,
                        'foo2' : 'test2',
                        'foo3' : false
                    }
                }),
                new maptalks.Marker([0, 0], {
                    properties : {
                        'foo1' : 3,
                        'foo2' : 'test3',
                        'foo3' : true
                    }
                }),
                new maptalks.Marker([0, 0], {
                    properties : {
                        'foo1' : 4,
                        'foo2' : 'test4',
                        'foo3' : true
                    }
                }),
                new maptalks.Circle([0, 0], 100, {
                    properties : {
                        'foo1' : 5,
                        'foo2' : 'test5',
                        'foo3' : true
                    }
                })
            ];

            var defaultSymbols = [];
            layer.addGeometry(points).forEach(function (geometry) {
                defaultSymbols.push(geometry.getSymbol());
            }).setStyle(style);

            expect(layer.getStyle()).to.be.eql(style);
            var i;
            for (i = 0; i < points.length; i++) {
                var hit = hitIndex.indexOf(i);
                if (hitIndex.indexOf(i) >= 0) {
                    expect(points[i]._getInternalSymbol()).to.be.eql(symbols[hit]);
                } else {
                    expect(points[i].getSymbol()).to.be.eql(defaultSymbols[i]);
                }
            }

            var geoAddLater = points[hitIndex[0]].copy();
            geoAddLater.setSymbol(null);
            layer.addGeometry(geoAddLater);
            expect(geoAddLater._getInternalSymbol()).to.be.eql(symbols[0]);

            var profile = layer.toJSON();
            for (i = 0; i < profile.geometries.length; i++) {
                expect(profile.geometries[i].symbol).not.to.be.ok();
            }

            layer.removeStyle();

            expect(layer.getStyle()).not.to.be.ok();

            for (i = 0; i < points.length; i++) {
                expect(points[i].getSymbol()).to.be.eql(defaultSymbols[i]);
            }
            expect(geoAddLater.getSymbol()).to.be.eql(defaultSymbols[0]);
        }