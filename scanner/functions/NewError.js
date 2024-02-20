function NewError(value) {
    var _this;
    _classCallCheck(this, NewError);
    _this = _callSuper(this, NewError, ['JSONPath should not be called with "new" (it prevents return ' + 'of (unwrapped) scalar values)']);
    _this.avoidNew = true;
    _this.value = value;
    _this.name = 'NewError';
    return _this;
  }