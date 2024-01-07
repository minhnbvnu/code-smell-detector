function checkLossAndTargetCompatibility(targets, lossFns, outputShapes) {
	  // TODO(cais): Dedicated test coverage?
	  var keyLosses = [meanSquaredError$1, binaryCrossentropy, categoricalCrossentropy];

	  for (var i = 0; i < targets.length; ++i) {
	    var y = targets[i];
	    var loss = lossFns[i];
	    var shape = outputShapes[i];

	    if (loss == null) {
	      continue;
	    }

	    if (loss === categoricalCrossentropy) {
	      if (y.shape[y.shape.length - 1] === 1) {
	        throw new ValueError("You are passing a target array of shape " + y.shape + " while using " + "a loss 'categorical_crossentropy'. 'categorical_crossentropy'" + "expects targets to be binary matrices (1s and 0s) of shape " + "[samples, classes]."); // TODO(cais): Example code in error message.
	      }
	    }

	    if (keyLosses.indexOf(loss) !== -1) {
	      var slicedYShape = y.shape.slice(1);
	      var slicedShape = shape.slice(1);

	      for (var j = 0; j < slicedYShape.length; ++j) {
	        var targetDim = slicedYShape[j];
	        var outDim = slicedShape[j];

	        if (outDim != null && targetDim !== outDim) {
	          throw new ValueError("A target Tensor with shape " + y.shape + " was passed for an " + ("output of shape " + shape + ", while using a loss function that ") + "expects targets to have the same shape as the output.");
	        }
	      }
	    }
	  }
	}