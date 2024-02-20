function UpSampling2D(args) {
	    var _this13;

	    _this13 = _Layer3.call(this, args) || this;
	    _this13.DEFAULT_SIZE = [2, 2];
	    _this13.inputSpec = [{
	      ndim: 4
	    }];
	    _this13.size = args.size == null ? _this13.DEFAULT_SIZE : args.size;
	    _this13.dataFormat = args.dataFormat == null ? 'channelsLast' : args.dataFormat;
	    checkDataFormat(_this13.dataFormat);
	    _this13.interpolation = args.interpolation == null ? 'nearest' : args.interpolation;
	    checkInterpolationFormat(_this13.interpolation);
	    return _this13;
	  }