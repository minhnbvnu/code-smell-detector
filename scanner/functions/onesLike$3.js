function onesLike$3(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var x = inputs.x;

	  if (x.dtype === 'string') {
	    throw new Error('onesLike is not supported under string dtype');
	  } else if (x.dtype === 'complex64') {
	    var realPart = real$2({
	      inputs: {
	        input: x
	      },
	      backend: backend
	    });
	    var r = onesLike$3({
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
	    // TODO(cais, smilkov): Add WebGL shader for onesLike:
	    //   https://github.com/tensorflow/tfjs/issues/1293
	    return fill$2({
	      attrs: {
	        shape: x.shape,
	        dtype: x.dtype,
	        value: 1
	      },
	      backend: backend
	    });
	  }
	}