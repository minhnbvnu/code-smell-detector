function fftImpl$1(x, inverse, backend) {
	  var xData = backend.texData.get(x.dataId);
	  var inputSize = sizeFromShape(x.shape); // Collapse all outer dimensions to a single batch dimension.

	  var innerDimensionSize = x.shape[x.shape.length - 1];
	  var batch = inputSize / innerDimensionSize;
	  var input2D = reshape$3({
	    inputs: {
	      x: x
	    },
	    backend: backend,
	    attrs: {
	      shape: [batch, innerDimensionSize]
	    }
	  });
	  var xShape = input2D.shape;
	  var realProgram = new FFTProgram('real', xShape, inverse);
	  var imagProgram = new FFTProgram('imag', xShape, inverse);
	  var inputs = [{
	    dataId: xData.complexTensorInfos.real.dataId,
	    dtype: xData.complexTensorInfos.real.dtype,
	    shape: xShape
	  }, {
	    dataId: xData.complexTensorInfos.imag.dataId,
	    dtype: xData.complexTensorInfos.imag.dtype,
	    shape: xShape
	  }];
	  var realPart = backend.runWebGLProgram(realProgram, inputs, 'float32');
	  var imagPart = backend.runWebGLProgram(imagProgram, inputs, 'float32');
	  var complexOutput = complex$2({
	    inputs: {
	      real: realPart,
	      imag: imagPart
	    },
	    backend: backend
	  });
	  backend.disposeIntermediateTensorInfo(realPart);
	  backend.disposeIntermediateTensorInfo(imagPart);
	  var complexOutputReshaped = reshape$3({
	    inputs: {
	      x: complexOutput
	    },
	    backend: backend,
	    attrs: {
	      shape: x.shape
	    }
	  });
	  backend.disposeIntermediateTensorInfo(complexOutputReshaped);
	  return complexOutputReshaped;
	}