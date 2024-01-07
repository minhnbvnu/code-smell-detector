function fftBatch(input, inverse, cpuBackend) {
	  var inputShape = input.shape;
	  var batch = inputShape[0];
	  var innerDim = inputShape[1];
	  var inputVals = cpuBackend.data.get(input.dataId);
	  var real2D = inputVals.complexTensorInfos.real;
	  var imag2D = inputVals.complexTensorInfos.imag; // Collects real and imaginary values separately.

	  var resultShape = [batch, innerDim];
	  var resultSize = sizeFromShape(resultShape);
	  var resultReal = getTypedArrayFromDType('float32', resultSize);
	  var resultImag = getTypedArrayFromDType('float32', resultSize);

	  for (var b = 0; b < batch; b++) {
	    // TODO: Support slice ops for complex type.
	    var r = slice$3({
	      inputs: {
	        x: real2D
	      },
	      backend: cpuBackend,
	      attrs: {
	        begin: [b, 0],
	        size: [1, innerDim]
	      }
	    });
	    var i = slice$3({
	      inputs: {
	        x: imag2D
	      },
	      backend: cpuBackend,
	      attrs: {
	        begin: [b, 0],
	        size: [1, innerDim]
	      }
	    });

	    var _input = complex$1({
	      inputs: {
	        real: r,
	        imag: i
	      },
	      backend: cpuBackend
	    }); // Run FFT by batch element.


	    var _fftImpl = fftImpl(_input, inverse, cpuBackend),
	        _real = _fftImpl.real,
	        _imag = _fftImpl.imag;

	    var res = mergeRealAndImagArrays(_real, _imag);

	    for (var d = 0; d < innerDim; d++) {
	      var c = getComplexWithIndex(res, d);
	      resultReal[b * innerDim + d] = c.real;
	      resultImag[b * innerDim + d] = c.imag;
	    }

	    cpuBackend.disposeIntermediateTensorInfo(r);
	    cpuBackend.disposeIntermediateTensorInfo(i);
	    cpuBackend.disposeIntermediateTensorInfo(_input);
	  }

	  var $realInfo = cpuBackend.makeTensorInfo(resultShape, 'float32', resultReal);
	  var $imagInfo = cpuBackend.makeTensorInfo(resultShape, 'float32', resultImag);
	  var result = complex$1({
	    inputs: {
	      real: $realInfo,
	      imag: $imagInfo
	    },
	    backend: cpuBackend
	  });
	  cpuBackend.disposeIntermediateTensorInfo($realInfo);
	  cpuBackend.disposeIntermediateTensorInfo($imagInfo);
	  return result;
	}