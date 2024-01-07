function test() {
            if (idx < geos.length) {
                layer.clear();
                const geo = geos[idx];
                geo.addTo(layer);
                setTimeout(() => {
                    const center = geo.getCenter();
                    center.z = undefined;
                    geo.openInfoWindow(center);
                    setTimeout(function () {
                        expect(geo.getInfoWindow().__uiDOM.style.display).not.to.be.eql('none');
                        idx++;
                        test();
                    }, 50);
                }, 40);
            } else {
                done();
            }
        }