function stopIndicesWithElidedDims(endMask, ellipsisInsertionIndex, numElidedAxes, originalEnd, inputShape) {
	  var newIndices = [].concat(inputShape);
	  var elidedAxes = getElidedAxes(numElidedAxes, ellipsisInsertionIndex);

	  for (var axis = 0; axis < newIndices.length; axis++) {
	    if (elidedAxes.indexOf(axis) > -1) {
	      newIndices[axis] = Number.MAX_SAFE_INTEGER;
	    } else {
	      var originalAxis = unnormalizeAxis(ellipsisInsertionIndex, numElidedAxes, axis);
	      var originalValue = originalEnd[originalAxis];

	      if (endMask & 1 << originalAxis) {
	        originalValue = Number.MAX_SAFE_INTEGER;
	      }

	      newIndices[axis] = originalValue;
	    }
	  }

	  for (var i = 0; i < newIndices.length; i++) {
	    // Handle negative indices
	    var axisSize = inputShape[i];

	    if (newIndices[i] < 0) {
	      newIndices[i] += axisSize;
	    }

	    newIndices[i] = clamp(0, newIndices[i], inputShape[i]);
	  }

	  return newIndices;
	}