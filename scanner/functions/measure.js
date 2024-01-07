function measure(tool, noDblClick) {
        var center = map.getCenter();

        var domPosition = GET_PAGE_POSITION(container);
        var point = map.coordinateToContainerPoint(center).add(domPosition);

        var measure = 0;
        happen.mousedown(eventContainer, {
            'clientX':point.x,
            'clientY':point.y
        });
        happen.click(eventContainer, {
            'clientX':point.x,
            'clientY':point.y
        });
        var i;
        for (i = 1; i < 10; i++) {
            happen.mousemove(eventContainer, {
                'clientX':point.x + i,
                'clientY':point.y
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

        happen.mousedown(eventContainer, {
            'clientX':point.x + 10,
            'clientY':point.y + 10
        });
        happen.click(eventContainer, {
            'clientX':point.x + 10,
            'clientY':point.y + 10
        });

        if (tool.isEnabled()) {
            expect(tool.getLastMeasure()).to.be.above(measure);
            measure = tool.getLastMeasure();
            tool.undo();
            tool.undo();
            tool.undo();
            tool.undo();
            tool.undo();
            tool.redo();
            tool.redo();
            tool.redo();
            tool.redo();
            tool.redo();
            expect(tool.getLastMeasure()).to.be.above(0);
        }
        for (i = 1; i < 5; i++) {
            happen.mousemove(eventContainer, {
                'clientX':point.x,
                'clientY':point.y + i
            });
            if (tool.isEnabled()) {
                expect(tool.getLastMeasure()).to.be.above(0);
            }
        }
        happen.mousedown(eventContainer, {
            'clientX':point.x - 1,
            'clientY':point.y + 5
        });
        happen.click(eventContainer, {
            'clientX':point.x - 1,
            'clientY':point.y + 5
        });
        if (!noDblClick) {
            happen.dblclick(eventContainer, {
                'clientX':point.x - 1,
                'clientY':point.y + 5
            });
        }

        if (tool.isEnabled()) {
            expect(tool.getLastMeasure()).to.be.above(measure);
            measure = tool.getLastMeasure();
        }
    }