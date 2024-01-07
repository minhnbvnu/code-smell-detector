function zerosLike$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var x = inputs.x;

	  if (x.dtype === 'string') {
	    throw new Error('zerosLike is not supported for string tensors');
	  } else if (x.dtype === 'complex64') {
	    var realPart = real$1({
	      inputs: {
	        input: x
	      },
	      backend: backend
	    });
	    var r = zerosLike$2({
	      inputs: {
	        x: realPart
	      },
	      backend: backend
	    });
	    var imagPart = imag$1({
	      inputs: {
	        input: x
	      },
	      backend: backend
	    });
	    var i = zerosLike$2({
	      inputs: {
	        x: imagPart
	      },
	      backend: backend
	    });
	    var result = complex$1({
	      inputs: {
	        real: r,
	        imag: i
	      },
	      backend: backend
	    });
	    backend.disposeIntermediateTensorInfo(realPart);
	    backend.disposeIntermediateTensorInfo(r);
	    backend.disposeIntermediateTensorInfo(imagPart);
	    backend.disposeIntermediateTensorInfo(i);
	    return result;
	  } else {
	    return fill$1({
	      backend: backend,
	      attrs: {
	        shape: x.shape,
	        value: 0,
	        dtype: x.dtype
	      }
	    });
	  }
	}