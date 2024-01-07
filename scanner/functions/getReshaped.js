function getReshaped(inputShape, blockShape, prod, batchToSpace) {
	  if (batchToSpace === void 0) {
	    batchToSpace = true;
	  }

	  var reshaped = [];

	  if (batchToSpace) {
	    reshaped = reshaped.concat(blockShape.slice(0));
	    reshaped.push(inputShape[0] / prod);
	    reshaped = reshaped.concat(inputShape.slice(1));
	  } else {
	    reshaped = reshaped.concat(inputShape[0]);
	    var spatialLength = blockShape.length;

	    for (var i = 0; i < spatialLength; ++i) {
	      reshaped = reshaped.concat([inputShape[i + 1] / blockShape[i], blockShape[i]]);
	    }

	    reshaped = reshaped.concat(inputShape.slice(spatialLength + 1));
	  }

	  return reshaped;
	}