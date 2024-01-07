function cmp(frame) {
            if (frame.state.playState !== 'finished') {
                return;
            }
            counter++;
            if (counter < geometries.length) {
                return;
            }
            for (var i = 0; i < expected.length; i++) {
                expect(expected[i].toGeoJSON()).to.eqlGeoJSON(geometries[i].toGeoJSON());
            }
            done();
        }