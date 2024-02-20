function ShimmerResponseError(message, errorCode) {
    var _this = _super.call(this, message) || this;

    _this.errorCode = errorCode;
    _this.code = CODE;
    return _this;
  }