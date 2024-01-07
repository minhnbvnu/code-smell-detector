function concatImpl$1(inputs, axis, backend) {
	  var dtype = inputs[0].dtype;

	  if (dtype === 'complex64') {
	    var reals = inputs.map(function (t) {
	      return real$2({
	        inputs: {
	          input: t
	        },
	        backend: backend
	      });
	    });
	    var imags = inputs.map(function (t) {
	      return imag$2({
	        inputs: {
	          input: t
	        },
	        backend: backend
	      });
	    });
	    var realConcated = concatImpl$1(reals, axis, backend);
	    var imagConcated = concatImpl$1(imags, axis, backend);

	    var _result = complex$2({
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
	    return _result;
	  } // Run on cpu if dtype is string. For string, the backend represents it
	  // as Uint8Array[], where each Uint8Array is a character. Given that the
	  // computation is only on the outer array, uploading the whole data onto
	  // gpu is wasteful. Also, currently webgl doesn't have a design to
	  // upload and retrieve Uint8Array[] between cpu and gpu. Therefore, we
	  // just run the kernel on cpu if dtype is string.


	  if (dtype === 'string') {
	    var _computeTensors2D = computeTensors2D(inputs, axis, backend),
	        _tensors2D = _computeTensors2D.tensors2D,
	        _outShape = _computeTensors2D.outShape;

	    var inputsValShapes = _tensors2D.map(function (t) {
	      return {
	        vals: backend.readSync(t.dataId),
	        shape: t.shape
	      };
	    });

	    var simplyConcat = _tensors2D[0].shape[0] === 1;
	    var outVals = concatImplCPU(inputsValShapes, _outShape, dtype, simplyConcat);
	    var finalOutShape = computeOutShape$1(inputs.map(function (t) {
	      return t.shape;
	    }), axis);
	    var outInfo = backend.makeTensorInfo(finalOutShape, dtype, outVals);

	    _tensors2D.forEach(function (t) {
	      return backend.disposeIntermediateTensorInfo(t);
	    });

	    return outInfo;
	  }

	  if (inputs.length > env().getNumber('WEBGL_MAX_TEXTURES_IN_SHADER')) {
	    var midIndex = Math.floor(inputs.length / 2);
	    var leftSide = concatImpl$1(inputs.slice(0, midIndex), axis, backend);
	    var rightSide = concatImpl$1(inputs.slice(midIndex), axis, backend);

	    var _result2 = concatImpl$1([leftSide, rightSide], axis, backend);

	    backend.disposeIntermediateTensorInfo(leftSide);
	    backend.disposeIntermediateTensorInfo(rightSide);
	    return _result2;
	  }

	  if (env().getBool('WEBGL_PACK_ARRAY_OPERATIONS') && inputs[0].shape.length > 1) {
	    var _program = new ConcatPackedProgram(inputs.map(function (t) {
	      return t.shape;
	    }), axis);

	    return backend.runWebGLProgram(_program, inputs, dtype);
	  }

	  var _computeTensors2D2 = computeTensors2D(inputs, axis, backend),
	      tensors2D = _computeTensors2D2.tensors2D,
	      outShape = _computeTensors2D2.outShape;

	  var program = new ConcatProgram(tensors2D.map(function (t) {
	    return t.shape;
	  }));
	  var result = backend.runWebGLProgram(program, tensors2D, dtype);
	  tensors2D.forEach(function (r) {
	    return backend.disposeIntermediateTensorInfo(r);
	  });
	  var reshapedResult = reshape$3({
	    inputs: {
	      x: result
	    },
	    attrs: {
	      shape: outShape
	    },
	    backend: backend
	  });
	  backend.disposeIntermediateTensorInfo(result);
	  return reshapedResult;
	}