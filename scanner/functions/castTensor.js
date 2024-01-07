function castTensor(x, dtype, backend) {
	  if (dtype === 'complex64') {
	    if (x.dtype === 'complex64') {
	      return x.clone();
	    }

	    var zerosTensor = zeros(x.shape);
	    var floatX = cast(x, 'float32');
	    var result = backend.complex(floatX, zerosTensor);
	    zerosTensor.dispose();
	    floatX.dispose();
	    return result;
	  }

	  if (!hasEncodingLoss(x.dtype, dtype)) {
	    // We don't change the underlying data, since we cast to higher
	    // precision.
	    return ENGINE.makeTensorFromDataId(x.dataId, x.shape, dtype);
	  }

	  if (x.dtype === 'complex64') {
	    var real = backend.real(x);

	    var _result = cast(real, dtype);

	    real.dispose();
	    return _result;
	  }

	  if (dtype === 'int32') {
	    return backend.int(x);
	  } else if (dtype === 'bool') {
	    var zero = scalar(0, x.dtype);

	    var _result2 = backend.notEqual(x, zero);

	    zero.dispose();
	    return _result2;
	  } else {
	    throw new Error("Error in Cast: failed to cast " + x.dtype + " to " + dtype);
	  }
	}