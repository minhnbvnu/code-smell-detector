function deepAssertShapeConsistency(val, shape, indices) {
	  indices = indices || [];

	  if (!Array.isArray(val) && !isTypedArray$1(val)) {
	    assert(shape.length === 0, function () {
	      return "Element arr[" + indices.join('][') + "] is a primitive, " + ("but should be an array/TypedArray of " + shape[0] + " elements");
	    });
	    return;
	  }

	  assert(shape.length > 0, function () {
	    return "Element arr[" + indices.join('][') + "] should be a primitive, " + ("but is an array of " + val.length + " elements");
	  });
	  assert(val.length === shape[0], function () {
	    return "Element arr[" + indices.join('][') + "] should have " + shape[0] + " " + ("elements, but has " + val.length + " elements");
	  });
	  var subShape = shape.slice(1);

	  for (var i = 0; i < val.length; ++i) {
	    deepAssertShapeConsistency(val[i], subShape, indices.concat(i));
	  }
	}