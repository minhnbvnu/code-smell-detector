function squeeze_(x, axis) {
	  var $x = convertToTensor(x, 'x', 'squeeze');
	  return reshape($x, squeezeShape($x.shape, axis).newShape);
	}