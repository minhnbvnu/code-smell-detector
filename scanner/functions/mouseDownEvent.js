function mouseDownEvent(event) {
        that.mousedown = true;
        that.mouse.down = true;
        that.mousepressed = true;
        // prevent unwanted browser drag and drop behavior
        _preventEvent(event);
    }