function rightclick() {
        _context.map.setCenter(target.getFirstCoordinate());
        var eventContainer = _context.map._panels.canvasContainer;
        var domPosition = GET_PAGE_POSITION(eventContainer);
        var point = _context.map.coordinateToContainerPoint(target.getFirstCoordinate()).add(domPosition);

        happen.once(eventContainer, {
            'type' : 'contextmenu',
            'clientX':point.x,
            'clientY':point.y
        });
    }