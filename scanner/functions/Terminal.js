function Terminal(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.browser = Browser;
        _this.options = options;
        _this.setup();
        return _this;
    }