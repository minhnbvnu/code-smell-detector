function TextParser(text, env, configuration, level) {
            var _this = _super.call(this, text, env, configuration) || this;
            _this.level = level;
            return _this;
        }