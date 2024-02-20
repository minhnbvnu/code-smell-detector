function RegExpMap(name, parser, _regExp) {
            var _this = _super.call(this, name, parser) || this;
            _this._regExp = _regExp;
            return _this;
        }