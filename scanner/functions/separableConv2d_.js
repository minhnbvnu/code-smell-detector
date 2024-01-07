function separableConv2d_(x, depthwiseFilter, pointwiseFilter, strides, pad, dilation, dataFormat) {
	  if (dilation === void 0) {
	    dilation = [1, 1];
	  }

	  if (dataFormat === void 0) {
	    dataFormat = 'NHWC';
	  }

	  var $x = convertToTensor(x, 'x', 'separableConv2d');
	  var $depthwiseFilter = convertToTensor(depthwiseFilter, 'depthwiseFilter', 'separableConv2d');
	  var $pointwiseFilter = convertToTensor(pointwiseFilter, 'pointwiseFilter', 'separableConv2d');
	  var x4D = $x;
	  var reshapedTo4D = false;

	  if ($x.rank === 3) {
	    reshapedTo4D = true;
	    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
	  }

	  if (dataFormat === 'NCHW') {
	    throw new Error('separableConv2d currently does not support dataFormat NCHW; only ' + 'NHWC is supported');
	  }

	  assert(x4D.rank === 4, function () {
	    return "Error in separableConv2d: input must be rank 4, but got " + ("rank " + x4D.rank + ".");
	  });
	  assert($depthwiseFilter.rank === 4, function () {
	    return "Error in separableConv2d: depthwise filter must be rank 4, but " + ("got rank " + $depthwiseFilter.rank + ".");
	  });
	  assert($pointwiseFilter.rank === 4, function () {
	    return "Error in separableConv2d: pointwise filter must be rank 4, but " + ("got rank " + $depthwiseFilter.rank + ".");
	  });
	  assert($pointwiseFilter.shape[0] === 1, function () {
	    return "Error in separableConv2d: the first dimension of pointwise filter " + (" must be 1, but got " + $pointwiseFilter.shape[0] + ".");
	  });
	  assert($pointwiseFilter.shape[1] === 1, function () {
	    return "Error in separableConv2d: the second dimension of pointwise " + ("filter must be 1, but got " + $pointwiseFilter.shape[1] + ".");
	  });
	  var inChannels = $depthwiseFilter.shape[2];
	  var channelMultiplier = $depthwiseFilter.shape[3];
	  assert($pointwiseFilter.shape[2] === inChannels * channelMultiplier, function () {
	    return "Error in separableConv2d: the third dimension of pointwise filter " + ("must be " + inChannels * channelMultiplier + ", ") + ("but got " + $pointwiseFilter.shape[2] + ".");
	  });
	  var depthwise = depthwiseConv2d(x4D, $depthwiseFilter, strides, pad, dataFormat, dilation);
	  var pointwiseStride = 1;
	  var res = conv2d(depthwise, $pointwiseFilter, pointwiseStride, 'valid', dataFormat);

	  if (reshapedTo4D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	  }

	  return res;
	}