function BaseItem(factory) {
            var nodes = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                nodes[_i - 1] = arguments[_i];
            }
            var _this = _super.call(this, nodes) || this;
            _this.factory = factory;
            _this.global = {};
            _this._properties = {};
            if (_this.isOpen) {
                _this._env = {};
            }
            return _this;
        }