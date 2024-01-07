function dragMarker(marker, isMove) {
        var spy = sinon.spy();
        marker.on('mousedown', spy);
        var domPosition = GET_PAGE_POSITION(container);
        var point = map.coordinateToContainerPoint(marker.getCoordinates()).add(domPosition);
        happen.mousedown(marker.getDOM(), {
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
            if (marker.options.draggable) {
                expect(marker.isDragging()).to.be.ok();
            }
        }

        happen.mouseup(document);
    }