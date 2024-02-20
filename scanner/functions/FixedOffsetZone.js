function FixedOffsetZone(offset) {
      var _this;

      _this = _Zone.call(this) || this;
      /** @private **/

      _this.fixed = offset;
      return _this;
    }