function conv3DBackpropFilter_(x, dy, filterShape, strides, pad) {
	  var x5D = x;

	  if (x.rank === 4) {
	    x5D = reshape(x, [1, x.shape[0], x.shape[1], x.shape[2], x.shape[3]]);
	  }

	  var dy5D = dy;

	  if (dy5D.rank === 4) {
	    dy5D = reshape(dy, [1, dy.shape[0], dy.shape[1], dy.shape[2], dy.shape[3]]);
	  }

	  assert(x5D.rank === 5, function () {
	    return "Error in conv3dDerFilter: input must be rank 5, but got shape " + (x5D.shape + ".");
	  });
	  assert(dy5D.rank === 5, function () {
	    return "Error in conv3dDerFilter: dy must be rank 5, but got shape " + (dy5D.shape + ".");
	  });
	  assert(filterShape.length === 5, function () {
	    return "Error in conv3dDerFilter: filterShape must be length 5, but got " + (filterShape + ".");
	  });
	  assert(x5D.shape[4] === filterShape[3], function () {
	    return "Error in conv3dDerFilter: depth of input " + x5D.shape[4] + ") must " + ("match input depth in filter (" + filterShape[3] + ".");
	  });
	  assert(dy5D.shape[4] === filterShape[4], function () {
	    return "Error in conv3dDerFilter: depth of dy (" + dy5D.shape[4] + ") must " + ("match output depth for filter (" + filterShape[4] + ").");
	  });
	  var inputs = {
	    x: x5D,
	    dy: dy5D
	  };
	  var attrs = {
	    strides: strides,
	    pad: pad,
	    filterShape: filterShape
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  return ENGINE.runKernel(Conv3DBackpropFilterV2, inputs, attrs);
	}