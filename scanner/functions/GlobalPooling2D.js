function GlobalPooling2D(args) {
	    var _this8;

	    _this8 = _Layer5.call(this, args) || this;
	    _this8.dataFormat = args.dataFormat == null ? 'channelsLast' : args.dataFormat;
	    checkDataFormat(_this8.dataFormat);
	    _this8.inputSpec = [new InputSpec({
	      ndim: 4
	    })];
	    return _this8;
	  }