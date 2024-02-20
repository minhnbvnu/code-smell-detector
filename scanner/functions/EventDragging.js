function EventDragging(component, eventPointing) {
        var _this = _super.call(this, component) || this;
        _this.isDragging = false;
        _this.eventPointing = eventPointing;
        return _this;
    }