function DateSelecting(component) {
        var _this = _super.call(this, component) || this;
        _this.dragListener = _this.buildDragListener();
        return _this;
    }