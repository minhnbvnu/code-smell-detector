function stopForAxis(endMask, stopIndices, strides, inputShape, axis, ellipsisMask) {
	  // Begin with the specified index
	  var stop = stopIndices[axis];
	  var stride = strides[axis] || 1; // Check the axis bit from right of masked axes, or if the stop index is not
	  // set for this axis.

	  if (endMask & 1 << axis || ellipsisMask & 1 << axis || stop == null) {
	    if (stride > 0) {
	      // Forward iteration - use the last element. These values will get
	      // clamped below
	      stop = Number.MAX_SAFE_INTEGER;
	    } else {
	      // Backward iteration - use the first element.
	      stop = Number.MIN_SAFE_INTEGER;
	    }
	  } // Handle negative indices


	  var axisSize = inputShape[axis];

	  if (stop < 0) {
	    stop += axisSize;
	  } // Clamping
	  // Because the end index points one past the last element, we need slightly
	  // different clamping ranges depending on the direction.


	  if (stride > 0) {
	    // Forward iteration
	    stop = clamp(0, stop, axisSize);
	  } else {
	    // Backward iteration
	    stop = clamp(-1, stop, axisSize - 1);
	  }

	  return stop;
	}