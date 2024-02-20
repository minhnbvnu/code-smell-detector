function OptionsManager(_calendar, overrides) {
        var _this = _super.call(this) || this;
        _this._calendar = _calendar;
        _this.overrides = $.extend({}, overrides); // make a copy
        _this.dynamicOverrides = {};
        _this.compute();
        return _this;
    }