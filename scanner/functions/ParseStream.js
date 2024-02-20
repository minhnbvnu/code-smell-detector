function ParseStream() {
      var _this;

      _this = _Stream.call(this) || this;
      _this.customParsers = [];
      _this.tagMappers = [];
      return _this;
    }