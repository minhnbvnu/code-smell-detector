function sizeToSquarishShape(size) {
	  var width = Math.ceil(Math.sqrt(size));
	  return [width, Math.ceil(size / width)];
	}