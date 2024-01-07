function getDenseTexShape(shape) {
	  var size = sizeFromShape(shape);
	  var texelsNeeded = Math.ceil(size / 4);
	  return sizeToSquarishShape(texelsNeeded);
	}