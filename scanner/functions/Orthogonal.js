function Orthogonal(args) {
	    var _this9;

	    _this9 = _Initializer9.call(this) || this;
	    _this9.DEFAULT_GAIN = 1;
	    _this9.gain = args.gain == null ? _this9.DEFAULT_GAIN : args.gain;
	    _this9.seed = args.seed;

	    if (_this9.seed != null) {
	      throw new NotImplementedError('Random seed is not implemented for Orthogonal Initializer yet.');
	    }

	    return _this9;
	  }