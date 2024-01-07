function maxPool3d_(x, filterSize, strides, pad, dimRoundingMode, dataFormat, dilations) {
	  if (filterSize === void 0) {
	    filterSize = [1, 1, 1];
	  }

	  if (dataFormat === void 0) {
	    dataFormat = 'NDHWC';
	  }

	  if (dilations == null) {
	    dilations = [1, 1, 1];
	  } else {
	    deprecationWarn('dilations is deprecated, this field will be gone in ' + 'v3.0.0.');
	  }

	  var $x = convertToTensor(x, 'x', 'maxPool3d');
	  var x5D = $x;
	  var reshapedTo5D = false;

	  if ($x.rank === 4) {
	    reshapedTo5D = true;
	    x5D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2], $x.shape[3]]);
	  }

	  assert(x5D.rank === 5, function () {
	    return "Error in maxPool3d: x must be rank 5 but got rank " + x5D.rank + ".";
	  });
	  assert(dataFormat === 'NDHWC', function () {
	    return "Error in maxPool3d: Only NDHWC is currently supported, " + ("but got dataFormat of " + dataFormat);
	  });
	  assert(eitherStridesOrDilationsAreOne(strides, dilations), function () {
	    return 'Error in maxPool3d: Either strides or dilations must be 1. ' + ("Got strides " + strides + " and dilations '" + dilations + "'");
	  });

	  if (dimRoundingMode != null) {
	    assert(isInt(pad), function () {
	      return "Error in maxPool3d: pad must be an integer when using, " + ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + ".");
	    });
	  }

	  var inputs = {
	    x: x5D
	  };
	  var attrs = {
	    filterSize: filterSize,
	    strides: strides,
	    pad: pad,
	    dimRoundingMode: dimRoundingMode,
	    dataFormat: dataFormat,
	    dilations: dilations
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(MaxPool3D, inputs, attrs);

	  if (reshapedTo5D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3], res.shape[4]]);
	  }

	  return res;
	}