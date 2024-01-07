function conv3DBackpropInput_(xShape, dy, filter, strides, pad) {
	  assert(xShape.length === dy.rank, function () {
	    return "Length of inShape " + ("(" + xShape.length + ") and rank of dy (" + dy.rank + ") must match");
	  });
	  var xShape5D = xShape;
	  var dy5D = dy;
	  var reshapedTo5D = false;

	  if (dy.rank === 4) {
	    reshapedTo5D = true;
	    dy5D = reshape(dy, [1, dy.shape[0], dy.shape[1], dy.shape[2], dy.shape[3]]);
	    xShape5D = [1, xShape[0], xShape[1], xShape[2], xShape[3]];
	  }

	  var inDepth = xShape5D[4];
	  var outDepth = dy5D.shape[4];
	  assert(xShape5D.length === 5, function () {
	    return "Error in conv3dDerInput: inShape must be length 5, but got length " + (xShape5D.length + ".");
	  });
	  assert(dy5D.rank === 5, function () {
	    return "Error in conv3dDerInput: dy must be rank 5, but got " + ("rank " + dy5D.rank);
	  });
	  assert(filter.rank === 5, function () {
	    return "Error in conv3dDerInput: filter must be rank 5, but got " + ("rank " + filter.rank);
	  });
	  assert(inDepth === filter.shape[3], function () {
	    return "Error in conv3dDerInput: depth of input (" + inDepth + ") must " + ("match input depth for filter " + filter.shape[3] + ".");
	  });
	  assert(outDepth === filter.shape[4], function () {
	    return "Error in conv3dDerInput: depth of output (" + outDepth + ") must " + ("match output depth for filter " + filter.shape[4] + ".");
	  });
	  var inputs = {
	    dy: dy5D,
	    filter: filter
	  };
	  var attrs = {
	    pad: pad,
	    strides: strides,
	    inputShape: xShape5D
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(Conv3DBackpropInputV2, inputs, attrs);

	  if (reshapedTo5D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3], res.shape[4]]);
	  }

	  return res;
	}