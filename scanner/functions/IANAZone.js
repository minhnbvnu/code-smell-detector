function IANAZone(name) {
      var _this;

      _this = _Zone.call(this) || this;
      /** @private **/

      _this.zoneName = name;
      /** @private **/

      _this.valid = IANAZone.isValidZone(name);
      return _this;
    }