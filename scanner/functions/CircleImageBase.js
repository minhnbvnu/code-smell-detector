function CircleImageBase(options, body, labelModule) {
      _classCallCheck(this, CircleImageBase);

      _get(Object.getPrototypeOf(CircleImageBase.prototype), 'constructor', this).call(this, options, body, labelModule);
      this.labelOffset = 0;
      this.imageLoaded = false;
    }