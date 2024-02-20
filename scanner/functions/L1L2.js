function L1L2(args) {
	    var _this;

	    _this = _Regularizer.call(this) || this;
	    assertObjectArgs(args);
	    _this.l1 = args == null || args.l1 == null ? 0.01 : args.l1;
	    _this.l2 = args == null || args.l2 == null ? 0.01 : args.l2;
	    _this.hasL1 = _this.l1 !== 0;
	    _this.hasL2 = _this.l2 !== 0;
	    return _this;
	  }