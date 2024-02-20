function Cropping2D(args) {
	    var _this11;

	    _this11 = _Layer2.call(this, args) || this;

	    if (typeof args.cropping === 'number') {
	      _this11.cropping = [[args.cropping, args.cropping], [args.cropping, args.cropping]];
	    } else if (typeof args.cropping[0] === 'number') {
	      _this11.cropping = [[args.cropping[0], args.cropping[0]], [args.cropping[1], args.cropping[1]]];
	    } else {
	      _this11.cropping = args.cropping;
	    }

	    _this11.dataFormat = args.dataFormat === undefined ? 'channelsLast' : args.dataFormat;
	    _this11.inputSpec = [{
	      ndim: 4
	    }];
	    return _this11;
	  }