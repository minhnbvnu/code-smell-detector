function computeTensors2D(inputs, axis, backend) {
	  // Any concat of n-dimensional tensors across any axis can be reduced to
	  // a concatenation of two-dimensional tensors across the axis 1 by first
	  // partitioning the axes of the original tensors into those less than the
	  // axis to be concatenated and the rest. Then reshape the tensors
	  // into a two-dimensional tensor by collapsing these two sets of axes and
	  // concatenate the resulting matrices across the axis 1, finally reshaping
	  // the result to have the proper shape.
	  var outShape = computeOutShape$1(inputs.map(function (t) {
	    return t.shape;
	  }), axis);
	  var tensors2D = inputs.map(function (x) {
	    return reshape$3({
	      inputs: {
	        x: x
	      },
	      attrs: {
	        shape: [-1, sizeFromShape(x.shape.slice(axis))]
	      },
	      backend: backend
	    });
	  });
	  return {
	    tensors2D: tensors2D,
	    outShape: outShape
	  };
	}