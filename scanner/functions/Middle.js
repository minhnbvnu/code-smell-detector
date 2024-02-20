function Middle(factory, delim, color) {
            var _this = _super.call(this, factory) || this;
            _this.setProperty('delim', delim);
            color && _this.setProperty('color', color);
            return _this;
        }