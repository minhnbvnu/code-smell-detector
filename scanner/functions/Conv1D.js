function Conv1D(args) {
	    var _this10;

	    _this10 = _Conv4.call(this, 1, args) || this;
	    Conv1D.verifyArgs(args);
	    _this10.inputSpec = [{
	      ndim: 3
	    }];
	    return _this10;
	  }