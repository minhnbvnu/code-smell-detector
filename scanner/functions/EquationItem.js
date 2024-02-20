function EquationItem(factory) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _this = _super.call(this, factory) || this;
            _this.factory.configuration.tags.start('equation', true, args[0]);
            return _this;
        }