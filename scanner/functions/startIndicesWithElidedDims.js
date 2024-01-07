function startIndicesWithElidedDims(beginMask, ellipsisInsertionIndex, numElidedAxes, originalBegin, inputShape) {
	  var newIndices = [].concat(inputShape);
	  var elidedAxes = getElidedAxes(numElidedAxes, ellipsisInsertionIndex);

	  for (var axis = 0; axis < newIndices.length; axis++) {
	    if (elidedAxes.indexOf(axis) > -1) {
	      newIndices[axis] = 0;
	    } else {
	      var originalAxis = unnormalizeAxis(ellipsisInsertionIndex, numElidedAxes, axis);
	      var originalValue = originalBegin[originalAxis];

	      if (beginMask & 1 << originalAxis) {
	        originalValue = 0;
	      }

	      newIndices[axis] = originalValue;
	    }
	  }

	  return newIndices;
	}