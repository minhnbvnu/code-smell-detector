function EnvironmentMap(name, parser, json, functionMap) {
            var _this = _super.call(this, name, json, functionMap) || this;
            _this.parser = parser;
            return _this;
        }