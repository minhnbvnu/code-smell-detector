function cast$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var dtype = attrs.dtype; // Casting to complex64.

	  if (dtype === 'complex64') {
	    if (x.dtype === 'complex64') {
	      return identity$1({
	        inputs: {
	          x: x
	        },
	        backend: backend
	      });
	    }

	    var zerosTensorInfo = zeros$2(backend, x.shape, x.dtype);
	    var floatX = cast$2({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        dtype: 'float32'
	      }
	    });
	    var result = complex$1({
	      inputs: {
	        real: floatX,
	        imag: zerosTensorInfo
	      },
	      backend: backend
	    });
	    backend.disposeIntermediateTensorInfo(zerosTensorInfo);
	    backend.disposeIntermediateTensorInfo(floatX);
	    return result;
	  } // Casting from complex64


	  if (x.dtype === 'complex64') {
	    var realPart = real$1({
	      inputs: {
	        input: x
	      },
	      backend: backend
	    });

	    var _result = cast$2({
	      inputs: {
	        x: realPart
	      },
	      backend: backend,
	      attrs: {
	        dtype: dtype
	      }
	    });

	    backend.disposeIntermediateTensorInfo(realPart);
	    return _result;
	  }

	  if (!hasEncodingLoss(x.dtype, dtype)) {
	    // We don't change the underlying data, since we cast to higher
	    // precision.
	    var _result2 = identity$1({
	      inputs: {
	        x: x
	      },
	      backend: backend
	    });

	    return {
	      dataId: _result2.dataId,
	      shape: _result2.shape,
	      dtype: dtype
	    };
	  }

	  if (dtype === 'int32') {
	    var values = backend.data.get(x.dataId).values;
	    var resultValues = Int32Array.from(values);
	    return backend.makeTensorInfo(x.shape, 'int32', resultValues);
	  }

	  if (dtype === 'bool') {
	    // This is essentially the result of notEqual(x, 0). We avoid using
	    // kernel notEqual to avoid circular dependency, i.e. binary_utils ->
	    // cast -> notEqual -> binary_utils.
	    var xVals = backend.data.get(x.dataId).values;
	    var zero = toTypedArray([0], x.dtype);

	    var _createSimpleBinaryKe = createSimpleBinaryKernelImpl(function (a, b) {
	      return a !== b ? 1 : 0;
	    })(x.shape, [], xVals, zero, 'bool'),
	        resultData = _createSimpleBinaryKe[0],
	        resultShape = _createSimpleBinaryKe[1];

	    return backend.makeTensorInfo(resultShape, 'bool', resultData);
	  }

	  throw new Error("Error in Cast: failed to cast " + x.dtype + " to " + dtype);
	}