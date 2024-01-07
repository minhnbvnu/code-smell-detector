function drawRegularShape () { // ['circle', 'ellipse', 'rectangle']
        var center = map.getCenter();
        var domPosition = GET_PAGE_POSITION(container);
        var point = map.coordinateToContainerPoint(center).add(domPosition);
        happen.mousedown(eventContainer, {
            'clientX':point.x,
            'clientY':point.y
        });
        happen.click(eventContainer, {
            'clientX':point.x,
            'clientY':point.y
        });
        for (var i = 0; i < 10; i++) {
            happen.mousemove(eventContainer, {
                'clientX':point.x + i,
                'clientY':point.y + i
            });
        }
        happen.mousedown(eventContainer, {
            'clientX':point.x - 1,
            'clientY':point.y + 5
        });
        happen.click(eventContainer, {
            'clientX':point.x - 1,
            'clientY':point.y + 5
        });
    }