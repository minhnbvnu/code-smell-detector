function conv3dTranspose_(x, filter, outputShape, strides, pad) {
	  var $x = convertToTensor(x, 'x', 'conv3dTranspose');
	  var $filter = convertToTensor(filter, 'filter', 'conv3dTranspose');
	  return conv3DBackpropInput(outputShape, $x, $filter, strides, pad);
	}