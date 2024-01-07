function onesLike$1(x, dtype, name) {
	  var allocated = onesLike(x);
	  return new LayerVariable(allocated, dtype, name);
	}