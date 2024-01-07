function cast$3(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var dtype = attrs.dtype; // Casting to complex64.

	  if (dtype === 'complex64') {
	    if (x.dtype === 'complex64') {
	      return identity$2({
	        inputs: {
	          x: x
	        },
	        backend: backend
	      });
	    } // TODO(annxingyuan): Import kernel function once zeros is modularized.


	    var zerosTensor = zeros(x.shape);
	    var floatX = cast$3({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        dtype: 'float32'
	      }
	    });
	    var result = complex$2({
	      inputs: {
	        real: floatX,
	        imag: zerosTensor
	      },
	      backend: backend
	    });
	    zerosTensor.dispose();
	    backend.disposeIntermediateTensorInfo(floatX);
	    return result;
	  } // Casting from complex64


	  if (x.dtype === 'complex64') {
	    var realPart = real$2({
	      inputs: {
	        input: x
	      },
	      backend: backend
	    });

	    var _result = cast$3({
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
	    var _result2 = identity$2({
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
	    return int(x, backend);
	  }

	  if (dtype === 'bool') {
	    var zerosTensorInfo = backend.makeTensorInfo([], 'bool', getTypedArrayFromDType('bool', 1));
	    var binaryInputs = {
	      a: x,
	      b: zerosTensorInfo
	    };

	    var _result3 = notEqual$2({
	      inputs: binaryInputs,
	      backend: backend
	    });

	    backend.disposeIntermediateTensorInfo(zerosTensorInfo);
	    return _result3;
	  }

	  throw new Error("Error in Cast: failed to cast " + x.dtype + " to " + dtype);
	}