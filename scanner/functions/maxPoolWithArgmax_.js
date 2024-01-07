function maxPoolWithArgmax_(x, filterSize, strides, pad, includeBatchInIndex) {
	  if (includeBatchInIndex === void 0) {
	    includeBatchInIndex = false;
	  }

	  var $x = convertToTensor(x, 'x', 'maxPoolWithArgmax');
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    filterSize: filterSize,
	    strides: strides,
	    pad: pad,
	    includeBatchInIndex: includeBatchInIndex
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var result = ENGINE.runKernel(MaxPoolWithArgmax, inputs, attrs);
	  return {
	    result: result[0],
	    indexes: result[1]
	  };
	}