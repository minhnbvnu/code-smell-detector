function getLogicalCoordinatesFromFlatIndex(coords, shape, index) {
	  if (index === void 0) {
	    index = 'index';
	  }

	  var strides = computeStrides(shape);
	  return strides.map(function (stride, i) {
	    var line1 = "int " + coords[i] + " = " + index + " / " + stride;
	    var line2 = i === strides.length - 1 ? "int " + coords[i + 1] + " = " + index + " - " + coords[i] + " * " + stride : "index -= " + coords[i] + " * " + stride;
	    return line1 + "; " + line2 + ";";
	  }).join('');
	}