function dragGeometry(geometry, isMove, offset) {
        var layer = map.getLayer('id').clear();
        map.setCenter(geometry.getFirstCoordinate());
        geometry.addTo(layer);
        var spy = sinon.spy();
        geometry.on('mousedown', spy);

        var domPosition = GET_PAGE_POSITION(container);
        var point = map.coordinateToContainerPoint(geometry.getFirstCoordinate()).add(domPosition);
        if (offset) {
            point._add(offset);
        }

        happen.mousedown(eventContainer, {
            'clientX':point.x,
            'clientY':point.y
        });
        expect(spy.called).to.be.ok();
        if (isMove === undefined || isMove) {
            for (var i = 0; i < 10; i++) {
                happen.mousemove(document, {
                    'clientX':point.x + i,
                    'clientY':point.y + i
                });
            }
        }
        happen.mouseup(document);
    }