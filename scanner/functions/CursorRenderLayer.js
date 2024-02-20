function CursorRenderLayer(container, zIndex, colors) {
        var _this = _super.call(this, container, 'cursor', zIndex, true, colors) || this;
        _this._state = {
            x: null,
            y: null,
            isFocused: null,
            style: null,
            width: null,
        };
        _this._cursorRenderers = {
            'bar': _this._renderBarCursor.bind(_this),
            'block': _this._renderBlockCursor.bind(_this),
            'underline': _this._renderUnderlineCursor.bind(_this)
        };
        return _this;
    }