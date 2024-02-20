function Activation(args) {
	    var _this8;

	    _this8 = _Layer4.call(this, args) || this;
	    _this8.supportsMasking = true;
	    _this8.activation = getActivation(args.activation);
	    return _this8;
	  }