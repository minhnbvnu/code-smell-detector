function runTransformTest(expectedXDelta, expectedYDelta) {
        element.fire("mousedown", {
            x: 50,
            y: 50,
            camera: camera
        });

        element.fire("mousemove", {
            x: 60,
            y: 60
        });

        expect(dragMoveHandler.callCount).to.equal(1);
        expect(dragMoveHandler.getCall(0).args[0].x).to.be.closeTo(expectedXDelta, 0.02);
        expect(dragMoveHandler.getCall(0).args[0].y).to.be.closeTo(expectedYDelta, 0.02);
    }