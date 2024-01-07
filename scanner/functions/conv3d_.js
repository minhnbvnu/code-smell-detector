function conv3d_(x, filter, strides, pad, dataFormat, dilations) {
	  if (dataFormat === void 0) {
	    dataFormat = 'NDHWC';
	  }

	  if (dilations === void 0) {
	    dilations = [1, 1, 1];
	  }

	  var $x = convertToTensor(x, 'x', 'conv3d');
	  var $filter = convertToTensor(filter, 'filter', 'conv3d');
	  var x5D = $x;
	  var reshapedTo5D = false;

	  if ($x.rank === 4) {
	    reshapedTo5D = true;
	    x5D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2], $x.shape[3]]);
	  }

	  assert(x5D.rank === 5, function () {
	    return "Error in conv3d: input must be rank 5, but got rank " + x5D.rank + ".";
	  });
	  assert($filter.rank === 5, function () {
	    return "Error in conv3d: filter must be rank 5, but got rank " + ($filter.rank + ".");
	  });
	  assert(x5D.shape[4] === $filter.shape[3], function () {
	    return "Error in conv3d: depth of input (" + x5D.shape[4] + ") must match " + ("input depth for filter " + $filter.shape[3] + ".");
	  });
	  assert(eitherStridesOrDilationsAreOne(strides, dilations), function () {
	    return 'Error in conv3D: Either strides or dilations must be 1. ' + ("Got strides " + strides + " and dilations '" + dilations + "'");
	  });
	  assert(dataFormat === 'NDHWC', function () {
	    return "Error in conv3d: got dataFormat of " + dataFormat + " but only NDHWC is currently supported.";
	  });
	  var inputs = {
	    x: x5D,
	    filter: $filter
	  };
	  var attrs = {
	    strides: strides,
	    pad: pad,
	    dataFormat: dataFormat,
	    dilations: dilations
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(Conv3D, inputs, attrs);

	  if (reshapedTo5D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3], res.shape[4]]);
	  }

	  return res;
	}