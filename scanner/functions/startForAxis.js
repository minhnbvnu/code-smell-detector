function startForAxis(beginMask, startIndices, strides, inputShape, axis, ellipsisMask) {
	  // Begin with the specified index
	  var start = startIndices[axis];
	  var stride = strides[axis] || 1; // Check the axis bit from right of masked axes, or the begin index is not set
	  // for the axis.

	  if (beginMask & 1 << axis || ellipsisMask & 1 << axis || start == null) {
	    if (stride > 0) {
	      // Forward iteration - use the first element. These values will get
	      // clamped below (Note: We could have set them to 0 and axis_size-1, but
	      // use lowest() and max() to maintain symmetry with StopForAxis())
	      start = Number.MIN_SAFE_INTEGER;
	    } else {
	      // Backward iteration - use the last element.
	      start = Number.MAX_SAFE_INTEGER;
	    }
	  } // Handle negative indices


	  var axisSize = inputShape[axis];

	  if (start < 0) {
	    start += axisSize;
	  } // Clamping


	  start = clamp(0, start, axisSize - 1);
	  return start;
	}