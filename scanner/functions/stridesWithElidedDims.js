function stridesWithElidedDims(strides, ellipsisInsertionIndex, numElidedAxes, inputShape) {
	  var newStrides = [].concat(strides);

	  for (var i = newStrides.length; i < inputShape.length; i++) {
	    newStrides.push(1);
	  }

	  for (var _i = 0; _i < numElidedAxes; _i++) {
	    if (_i === 0) {
	      newStrides[ellipsisInsertionIndex] = 1;
	    } else {
	      newStrides.splice(ellipsisInsertionIndex, 0
	      /* num elements to delete */
	      , 1
	      /* element to add */
	      );
	      newStrides.pop();
	    }
	  }

	  return newStrides;
	}