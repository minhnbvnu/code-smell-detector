function DateSchema() {
  var _this = this;

  if (!(this instanceof DateSchema)) return new DateSchema();
  _mixed__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].call(this, {
    type: 'date'
  });
  this.withMutation(function () {
    _this.transform(function (value) {
      if (this.isType(value)) return value;
      value = Object(_util_isodate__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(value); // 0 is a valid timestamp equivalent to 1970-01-01T00:00:00Z(unix epoch) or before.

      return !isNaN(value) ? new Date(value) : invalidDate;
    });
  });
}