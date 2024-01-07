function drawLine(drawTool) {
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
            'clientX':point.x + 10,
            'clientY':point.y
        });
        happen.click(eventContainer, {
            'clientX':point.x + 10,
            'clientY':point.y
        });

        var geojson1 = drawTool.getCurrentGeometry().toGeoJSON();

        happen.mousedown(eventContainer, {
            'clientX':point.x,
            'clientY':point.y + 10
        });
        happen.click(eventContainer, {
            'clientX':point.x,
            'clientY':point.y + 10
        });

        var geojson2 = drawTool.getCurrentGeometry().toGeoJSON();

        drawTool.undo();
        expect(drawTool.getCurrentGeometry().toGeoJSON()).to.be.eqlGeoJSON(geojson1);

        drawTool.redo();
        expect(drawTool.getCurrentGeometry().toGeoJSON()).to.be.eqlGeoJSON(geojson2);

        happen.dblclick(eventContainer, {
            'clientX':point.x - 1,
            'clientY':point.y + 5
        });
    }