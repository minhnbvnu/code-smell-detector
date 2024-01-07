function prepareSplitSize(x, numOrSizeSplits, axis) {
	  if (axis === void 0) {
	    axis = 0;
	  }

	  var splitSizes = [];

	  if (typeof numOrSizeSplits === 'number') {
	    assert(x.shape[axis] % numOrSizeSplits === 0, function () {
	      return 'Number of splits must evenly divide the axis.';
	    });
	    splitSizes = new Array(numOrSizeSplits).fill(x.shape[axis] / numOrSizeSplits);
	  } else {
	    var numOfNegs = numOrSizeSplits.reduce(function (count, value) {
	      if (value === -1) {
	        count += 1;
	      }

	      return count;
	    }, 0);
	    assert(numOfNegs <= 1, function () {
	      return 'There should be only one negative value in split array.';
	    });
	    var negIndex = numOrSizeSplits.indexOf(-1); // Allow the number of split array to be -1, which indicates the rest
	    // of dimension is allocated to that split.

	    if (negIndex !== -1) {
	      var total = numOrSizeSplits.reduce(function (a, b) {
	        return b > 0 ? a + b : a;
	      });
	      numOrSizeSplits[negIndex] = x.shape[axis] - total;
	    }

	    assert(x.shape[axis] === numOrSizeSplits.reduce(function (a, b) {
	      return a + b;
	    }), function () {
	      return 'The sum of sizes must match the size of the axis dimension.';
	    });
	    splitSizes = numOrSizeSplits;
	  }

	  return splitSizes;
	}