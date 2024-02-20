function Declaration(defaults) {
    var _this;
    _classCallCheck(this, Declaration);
    if (defaults && typeof defaults.value !== 'undefined' && typeof defaults.value !== 'string') {
      defaults = _objectSpread(_objectSpread({}, defaults), {}, {
        value: String(defaults.value)
      });
    }
    _this = _super.call(this, defaults);
    _this.type = 'decl';
    return _this;
  }