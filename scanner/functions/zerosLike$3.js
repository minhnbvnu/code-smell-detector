function zerosLike$3(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var x = inputs.x;

	  if (x.dtype === 'complex64') {
	    var realPart = real$2({
	      inputs: {
	        input: x
	      },
	      backend: backend
	    });
	    var r = zerosLike$3({
	      inputs: {
	        x: realPart
	      },
	      backend: backend
	    });
	    var imagPart = imag$2({
	      inputs: {
	        input: x
	      },
	      backend: backend
	    });
	    var i = zerosLike$3({
	      inputs: {
	        x: imagPart
	      },
	      backend: backend
	    });
	    var result = complex$2({
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
	    return fill$2({
	      attrs: {
	        shape: x.shape,
	        dtype: x.dtype,
	        value: x.dtype === 'string' ? '' : 0
	      },
	      backend: backend
	    });
	  }
	}