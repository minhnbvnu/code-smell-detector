function getReshapedPermuted(inputShape, blockShape, prod, batchToSpace) {
	  if (batchToSpace === void 0) {
	    batchToSpace = true;
	  }

	  var reshapedPermuted = [];

	  if (batchToSpace) {
	    reshapedPermuted.push(inputShape[0] / prod);
	  } else {
	    reshapedPermuted.push(inputShape[0] * prod);
	  }

	  for (var i = 1; i < inputShape.length; ++i) {
	    if (i <= blockShape.length) {
	      if (batchToSpace) {
	        reshapedPermuted.push(blockShape[i - 1] * inputShape[i]);
	      } else {
	        reshapedPermuted.push(inputShape[i] / blockShape[i - 1]);
	      }
	    } else {
	      reshapedPermuted.push(inputShape[i]);
	    }
	  }

	  return reshapedPermuted;
	}