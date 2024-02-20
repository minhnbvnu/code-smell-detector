function Scroller(options) {
        var _this = _super.call(this) || this;
        options = options || {};
        _this.overflowX = options.overflowX || options.overflow || 'auto';
        _this.overflowY = options.overflowY || options.overflow || 'auto';
        return _this;
    }