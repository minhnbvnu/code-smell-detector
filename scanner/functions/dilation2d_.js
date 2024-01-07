function dilation2d_(x, filter, strides, pad, dilations, dataFormat) {
	  if (dilations === void 0) {
	    dilations = [1, 1];
	  }

	  if (dataFormat === void 0) {
	    dataFormat = 'NHWC';
	  }

	  var $x = convertToTensor(x, 'x', 'dilation2d');
	  var $filter = convertToTensor(filter, 'filter', 'dilation2d');
	  assert($x.rank === 3 || $x.rank === 4, function () {
	    return "Error in dilation2d: input must be rank 3 or 4, but got rank " + ($x.rank + ".");
	  });
	  assert($filter.rank === 3, function () {
	    return "Error in dilation2d: filter must be rank 3, but got rank " + ($filter.rank + ".");
	  });
	  assert(dataFormat === 'NHWC', function () {
	    return "Error in dilation2d: Only NHWC is currently supported, " + ("but got dataFormat of " + dataFormat);
	  });
	  var x4D = $x;
	  var reshapedTo4D = false;

	  if ($x.rank === 3) {
	    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
	    reshapedTo4D = true;
	  }

	  var inputs = {
	    x: x4D,
	    filter: $filter
	  };
	  var attrs = {
	    strides: strides,
	    pad: pad,
	    dilations: dilations
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(Dilation2D, inputs, attrs);

	  if (reshapedTo4D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	  }

	  return res;
	}