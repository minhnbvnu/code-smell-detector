function concat$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var axis = attrs.axis;
	  var $axis = parseAxisParam(axis, inputs[0].shape)[0];
	  var outShape = computeOutShape$1(inputs.map(function (t) {
	    return t.shape;
	  }), $axis);

	  if (sizeFromShape(outShape) === 0) {
	    return backend.makeTensorInfo(outShape, inputs[0].dtype, []);
	  } // Keep only non-empty tensors (ignore tensors with 0 in their shape).


	  var $inputs = inputs.filter(function (t) {
	    return sizeFromShape(t.shape) > 0;
	  });

	  if ($inputs.length === 1) {
	    return identity$1({
	      inputs: {
	        x: $inputs[0]
	      },
	      backend: backend
	    });
	  }

	  var shapes = $inputs.map(function (t) {
	    return t.shape;
	  });
	  assertParamsConsistent(shapes, $axis);

	  if ($inputs[0].dtype === 'complex64') {
	    var reals = $inputs.map(function (t) {
	      return real$1({
	        inputs: {
	          input: t
	        },
	        backend: backend
	      });
	    });
	    var imags = $inputs.map(function (t) {
	      return imag$1({
	        inputs: {
	          input: t
	        },
	        backend: backend
	      });
	    });
	    var realConcated = concat$1({
	      inputs: reals,
	      backend: backend,
	      attrs: {
	        axis: $axis
	      }
	    });
	    var imagConcated = concat$1({
	      inputs: imags,
	      backend: backend,
	      attrs: {
	        axis: $axis
	      }
	    });
	    var result = complex$1({
	      inputs: {
	        real: realConcated,
	        imag: imagConcated
	      },
	      backend: backend
	    });
	    reals.forEach(function (r) {
	      return backend.disposeIntermediateTensorInfo(r);
	    });
	    imags.forEach(function (i) {
	      return backend.disposeIntermediateTensorInfo(i);
	    });
	    backend.disposeIntermediateTensorInfo(realConcated);
	    backend.disposeIntermediateTensorInfo(imagConcated);
	    return result;
	  } // Any concat of n-dimensional tensors across any axis can be reduced to
	  // a concatenation of two-dimensional tensors across the axis 1 by first
	  // partitioning the axes of the original tensors into those less than the
	  // axis to be concatenated and the rest. Then reshape the tensors
	  // into a two-dimensional tensor by collapsing these two sets of axes and
	  // concatenate the resulting matrices across the axis 1, finally reshaping
	  // the result to have the proper shape.


	  var inputs2D = $inputs.map(function (t) {
	    var innerSize = sizeFromShape(t.shape.slice($axis));
	    var shape = [-1, innerSize];
	    return reshape$2({
	      inputs: {
	        x: t
	      },
	      backend: backend,
	      attrs: {
	        shape: shape
	      }
	    });
	  });
	  var inputsValShapes = inputs2D.map(function (t) {
	    return {
	      vals: backend.data.get(t.dataId).values,
	      shape: t.shape
	    };
	  }); // Concats 2d tensors along axis=1.

	  outShape = computeOutShape$1(inputs2D.map(function (t) {
	    return t.shape;
	  }), 1
	  /* axis */
	  );
	  var simplyConcat = inputs2D[0].shape[0] === 1;
	  var outVals = concatImpl(inputsValShapes, outShape, inputs[0].dtype, simplyConcat);
	  var finalOutShape = computeOutShape$1($inputs.map(function (t) {
	    return t.shape;
	  }), $axis);
	  var outInfo = backend.makeTensorInfo(finalOutShape, inputs[0].dtype, outVals);
	  inputs2D.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return outInfo;
	}