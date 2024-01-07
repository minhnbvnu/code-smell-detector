function flatten$1(x) {
	  var newShape = [arrayProd(x.shape)];
	  return x.reshape(newShape);
	}