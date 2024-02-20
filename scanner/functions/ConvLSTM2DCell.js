function ConvLSTM2DCell(args) {
	    var _this5;

	    var filters = args.filters,
	        kernelSize = args.kernelSize,
	        strides = args.strides,
	        padding = args.padding,
	        dataFormat = args.dataFormat,
	        dilationRate = args.dilationRate;
	    _this5 = _LSTMCell.call(this, Object.assign({}, args, {
	      units: filters
	    })) || this;
	    _this5.filters = filters;
	    assertPositiveInteger(_this5.filters, 'filters');
	    _this5.kernelSize = normalizeArray(kernelSize, 2, 'kernelSize');

	    _this5.kernelSize.forEach(function (size) {
	      return assertPositiveInteger(size, 'kernelSize');
	    });

	    _this5.strides = normalizeArray(strides || 1, 2, 'strides');

	    _this5.strides.forEach(function (stride) {
	      return assertPositiveInteger(stride, 'strides');
	    });

	    _this5.padding = padding || 'valid';
	    checkPaddingMode(_this5.padding);
	    _this5.dataFormat = dataFormat || 'channelsLast';
	    checkDataFormat(_this5.dataFormat);
	    _this5.dilationRate = normalizeArray(dilationRate || 1, 2, 'dilationRate');

	    _this5.dilationRate.forEach(function (rate) {
	      return assertPositiveInteger(rate, 'dilationRate');
	    });

	    return _this5;
	  }