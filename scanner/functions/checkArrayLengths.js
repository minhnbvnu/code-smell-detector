function checkArrayLengths(inputs, targets, weights) {
	  var setX = unique$1(inputs.map(function (input) {
	    return input.shape[0];
	  }));
	  setX.sort();
	  var setY = unique$1(targets.map(function (target) {
	    return target.shape[0];
	  }));
	  setY.sort(); // TODO(cais): Check `weights` as well.

	  if (setX.length > 1) {
	    throw new ValueError("All input Tensors (x) should have the same number of samples. " + "Got array shapes: " + ("" + JSON.stringify(inputs.map(function (input) {
	      return input.shape;
	    }))));
	  }

	  if (setY.length > 1) {
	    throw new ValueError("All target Tensors (y) should have the same number of samples. " + "Got array shapes: " + ("" + JSON.stringify(targets.map(function (target) {
	      return target.shape;
	    }))));
	  }

	  if (setX.length > 0 && setY.length > 0 && !arraysEqual(setX, setY)) {
	    throw new ValueError("Input Tensors should have the same number of samples as target " + ("Tensors. Found " + setX[0] + " input sample(s) and " + setY[0] + " target ") + "sample(s).");
	  }
	}