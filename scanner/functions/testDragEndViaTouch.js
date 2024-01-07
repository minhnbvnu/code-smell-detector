function testDragEndViaTouch(touchEventName) {
        element.fire("touchstart", {
            x: 50,
            y: 50,
            camera: camera
        });

        element.fire(touchEventName);

        expect(dragEndHandler.callCount).to.equal(1);
        expect(dragHelper.isDragging).to.equal(false);

        app.touch.fire("touchmove", {
            x: 51,
            y: 52
        });

        expect(dragMoveHandler.callCount).to.equal(0);
    }