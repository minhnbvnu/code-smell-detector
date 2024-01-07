function dragDraw() {
        var center = map.getCenter();

        var domPosition = GET_PAGE_POSITION(container);
        var point = map.coordinateToContainerPoint(center).add(domPosition);
        happen.mousedown(eventContainer, {
            'clientX':point.x,
            'clientY':point.y
        });
        mapMousemove(map, 10, function () {
            happen.mouseup(eventContainer, {
                'clientX':point.x - 10,
                'clientY':point.y - 10
            });
            // callback();
        })

        for (var i = 0; i < 10; i++) {
            happen.mousemove(eventContainer, {
                'clientX':point.x - i,
                'clientY':point.y - i
            });
        }
      
    }