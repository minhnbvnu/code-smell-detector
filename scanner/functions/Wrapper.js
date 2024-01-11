function Wrapper(args) {
	    var _this;

	    // Porting Note: In PyKeras, `self.layer` is set prior to the calling
	    //   `super()`. But we can't do that here due to TypeScript's restriction.
	    //   See: https://github.com/Microsoft/TypeScript/issues/8277
	    //   As a result, we have to add checks in `get trainable()` and
	    //   `set trainable()` below in order to prevent using `this.layer` when
	    //   its value is `undefined`. The super constructor does use the getter
	    //   and the setter of `this.layer`.
	    _this = _Layer.call(this, args) || this;
	    _this.layer = args.layer;
	    return _this;
	  }