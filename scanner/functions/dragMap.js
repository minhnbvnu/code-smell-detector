function dragMap() {
        var domPosition = GET_PAGE_POSITION(container);
        var point = map.coordinateToContainerPoint(map.getCenter()).add(domPosition).add(new maptalks.Point(30, 20));
        happen.mousedown(eventContainer, {
            'clientX':point.x,
            'clientY':point.y
        });
        for (var i = 0; i < 10; i++) {
            happen.mousemove(document, {
                'clientX':point.x + i,
                'clientY':point.y + i
            });
        }
        happen.mouseup(document);
    }