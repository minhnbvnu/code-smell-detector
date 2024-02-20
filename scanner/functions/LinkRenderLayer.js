function LinkRenderLayer(container, zIndex, colors, terminal) {
        var _this = _super.call(this, container, 'link', zIndex, true, colors) || this;
        _this._state = null;
        terminal.linkifier.on(Types_1.LinkHoverEventTypes.HOVER, function (e) { return _this._onLinkHover(e); });
        terminal.linkifier.on(Types_1.LinkHoverEventTypes.LEAVE, function (e) { return _this._onLinkLeave(e); });
        return _this;
    }