function dragToRotate(dx, dy) {
        dx = dx || 0;
        dy = dy || 0;
        var domPosition = GET_PAGE_POSITION(container);
        var center = map.getCenter();
        var point = map.coordinateToContainerPoint(center).add(domPosition);

        happen.mousedown(map._panels.front, {
            'clientX':point.x,
            'clientY':point.y,
            'button' : 2
        });
        for (var i = 0; i < 10; i++) {
            happen.mousemove(document, {
                'clientX':point.x + i * dx,
                'clientY':point.y + i * dy,
                'button' : 2
            });
        }
        happen.mouseup(document);
    }