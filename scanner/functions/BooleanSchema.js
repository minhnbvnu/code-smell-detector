function BooleanSchema() {
  var _this = this;

  if (!(this instanceof BooleanSchema)) return new BooleanSchema();
  _mixed__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].call(this, {
    type: 'boolean'
  });
  this.withMutation(function () {
    _this.transform(function (value) {
      if (!this.isType(value)) {
        if (/^(true|1)$/i.test(value)) return true;
        if (/^(false|0)$/i.test(value)) return false;
      }

      return value;
    });
  });
}