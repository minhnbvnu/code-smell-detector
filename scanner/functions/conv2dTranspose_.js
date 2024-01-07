function conv2dTranspose_(x, filter, outputShape, strides, pad, dimRoundingMode) {
	  var $x = convertToTensor(x, 'x', 'conv2dTranspose');
	  var $filter = convertToTensor(filter, 'filter', 'conv2dTranspose');
	  return conv2DBackpropInput(outputShape, $x, $filter, strides, pad, 'NHWC', dimRoundingMode);
	}