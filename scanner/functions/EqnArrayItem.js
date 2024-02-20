function EqnArrayItem(factory) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _this = _super.call(this, factory) || this;
            _this.maxrow = 0;
            _this.factory.configuration.tags.start(args[0], args[2], args[1]);
            return _this;
        }