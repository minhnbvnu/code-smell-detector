function StringSchema() {
  var _this = this;

  if (!(this instanceof StringSchema)) return new StringSchema();
  _mixed__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].call(this, {
    type: 'string'
  });
  this.withMutation(function () {
    _this.transform(function (value) {
      if (this.isType(value)) return value;
      return value != null && value.toString ? value.toString() : value;
    });
  });
}