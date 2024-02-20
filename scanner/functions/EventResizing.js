function EventResizing(component, eventPointing) {
        var _this = _super.call(this, component) || this;
        _this.isResizing = false;
        _this.eventPointing = eventPointing;
        return _this;
    }