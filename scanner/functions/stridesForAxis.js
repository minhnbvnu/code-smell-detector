function stridesForAxis(strides, axis, ellipsisMask) {
	  var stride = strides[axis];

	  if (ellipsisMask & 1 << axis || stride == null) {
	    stride = 1;
	  }

	  return stride;
	}