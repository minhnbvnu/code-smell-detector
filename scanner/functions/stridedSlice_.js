function stridedSlice_(x, begin, end, strides, beginMask, endMask, ellipsisMask, newAxisMask, shrinkAxisMask) {
	  if (beginMask === void 0) {
	    beginMask = 0;
	  }

	  if (endMask === void 0) {
	    endMask = 0;
	  }

	  if (ellipsisMask === void 0) {
	    ellipsisMask = 0;
	  }

	  if (newAxisMask === void 0) {
	    newAxisMask = 0;
	  }

	  if (shrinkAxisMask === void 0) {
	    shrinkAxisMask = 0;
	  }

	  var $x = convertToTensor(x, 'x', 'stridedSlice');
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    begin: begin,
	    end: end,
	    strides: strides,
	    beginMask: beginMask,
	    endMask: endMask,
	    ellipsisMask: ellipsisMask,
	    newAxisMask: newAxisMask,
	    shrinkAxisMask: shrinkAxisMask
	  };
	  return ENGINE.runKernel(StridedSlice, inputs, attrs);
	}