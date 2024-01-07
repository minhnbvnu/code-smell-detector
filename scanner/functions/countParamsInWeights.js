function countParamsInWeights(weights) {
	  var count = 0;

	  for (var _iterator = _createForOfIteratorHelperLoose(weights), _step; !(_step = _iterator()).done;) {
	    var weight = _step.value;

	    if (weight.shape.length === 0) {
	      count += 1;
	    } else {
	      count += weight.shape.reduce(function (a, b) {
	        return a * b;
	      });
	    }
	  }

	  return count;
	}