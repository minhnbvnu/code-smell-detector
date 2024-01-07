function getNoiseShape(x, noiseShape) {
	  if (noiseShape == null) {
	    return x.shape.slice();
	  }

	  if (arraysEqual(x.shape, noiseShape)) {
	    return noiseShape;
	  }

	  if (x.shape.length === noiseShape.length) {
	    var newDimension = [];

	    for (var i = 0; i < x.shape.length; i++) {
	      if (noiseShape[i] == null && x.shape[i] != null) {
	        newDimension.push(x.shape[i]);
	      } else {
	        newDimension.push(noiseShape[i]);
	      }
	    }

	    return newDimension;
	  }

	  return noiseShape;
	}