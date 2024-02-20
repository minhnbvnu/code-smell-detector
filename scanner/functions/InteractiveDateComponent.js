function InteractiveDateComponent(_view, _options) {
        var _this = _super.call(this, _view, _options) || this;
        // self-config, overridable by subclasses
        _this.segSelector = '.fc-event-container > *'; // what constitutes an event element?
        if (_this.dateSelectingClass) {
            _this.dateClicking = new _this.dateClickingClass(_this);
        }
        if (_this.dateSelectingClass) {
            _this.dateSelecting = new _this.dateSelectingClass(_this);
        }
        if (_this.eventPointingClass) {
            _this.eventPointing = new _this.eventPointingClass(_this);
        }
        if (_this.eventDraggingClass && _this.eventPointing) {
            _this.eventDragging = new _this.eventDraggingClass(_this, _this.eventPointing);
        }
        if (_this.eventResizingClass && _this.eventPointing) {
            _this.eventResizing = new _this.eventResizingClass(_this, _this.eventPointing);
        }
        if (_this.externalDroppingClass) {
            _this.externalDropping = new _this.externalDroppingClass(_this);
        }
        return _this;
    }