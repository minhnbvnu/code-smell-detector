function SelectionRenderLayer(container, zIndex, colors) {
        var _this = _super.call(this, container, 'selection', zIndex, true, colors) || this;
        _this._state = {
            start: null,
            end: null
        };
        return _this;
    }