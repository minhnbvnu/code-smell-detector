function sliceInfo(xShape, begin, end, strides, beginMask, endMask, ellipsisMask, newAxisMask, shrinkAxisMask) {
	  // make a copy because it may be modified further down.
	  var $begin = begin.slice();
	  var $end = end.slice();
	  var $strides = strides;

	  if (strides == null) {
	    $strides = new Array($begin.length);
	  }

	  var ellipsisAxes = maskToAxes(ellipsisMask);

	  if (ellipsisAxes.length > 1) {
	    throw new Error('Multiple ellipses in slice is not allowed.');
	  }

	  if (ellipsisMask !== 0 && newAxisMask !== 0) {
	    throw new Error('Using both ellipsisMask and newAxisMask is not yet supported.');
	  }

	  if (ellipsisMask !== 0 && shrinkAxisMask !== 0) {
	    throw new Error('Using both ellipsisMask and shrinkAxisMask is not yet supported.');
	  }

	  var numInterpolatedAxes = xShape.length - $begin.length; // Expand the dims of x based on the newAxisMask.

	  var expandAxes = maskToAxes(newAxisMask);
	  var newShape = xShape.slice();
	  expandAxes.forEach(function (axis) {
	    $begin[axis] = 0;
	    $end[axis] = 1;
	    newShape.splice(axis, 0, 1);
	  });

	  var _getNormalizedAxes = getNormalizedAxes(newShape, ellipsisAxes, numInterpolatedAxes, $begin, $end, $strides, beginMask, endMask, ellipsisMask),
	      normalizedBegin = _getNormalizedAxes.begin,
	      normalizedEnd = _getNormalizedAxes.end,
	      normalizedStrides = _getNormalizedAxes.strides;

	  $begin = normalizedBegin;
	  $end = normalizedEnd;
	  $strides = normalizedStrides;
	  var shrinkAxes = maskToAxes(shrinkAxisMask); // Adjust the ends based on the shrink mask.

	  shrinkAxes.forEach(function (axis) {
	    $end[axis] = $begin[axis] + 1;
	    $strides[axis] = 1;
	  }); // Figure out the output shape.

	  var size = computeOutShape($begin, $end, $strides); // Remove the axes based on shrinkMask.

	  var outShape = size.filter(function (_, axis) {
	    return shrinkAxes.indexOf(axis) === -1;
	  });
	  var nonStrided = $strides.every(function (v) {
	    return v === 1;
	  });
	  return {
	    nonStrided: nonStrided,
	    $begin: $begin,
	    $end: $end,
	    $strides: $strides,
	    size: size,
	    newShape: newShape,
	    outShape: outShape
	  };
	}