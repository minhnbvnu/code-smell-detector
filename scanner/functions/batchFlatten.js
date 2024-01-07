function batchFlatten(x) {
	  if (x.rank <= 1) {
	    throw new ValueError("batchFlatten requires a minimum rank of 2. Got rank: " + x.rank + ".");
	  }

	  var newShape = [x.shape[0], arrayProd(x.shape, 1)];
	  return x.reshape(newShape);
	}