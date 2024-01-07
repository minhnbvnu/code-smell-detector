function dragPanel(panel) {
        var dom = panel.getContainer().childNodes[0],
            domPosition = GET_PAGE_POSITION(dom),
            point = new maptalks.Point(0, 0).add(domPosition);
        happen.mousedown(dom, {
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