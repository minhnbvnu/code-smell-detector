function multiply$3(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var a = inputs.a,
	      b = inputs.b;
	  var dtype = upcastType(a.dtype, b.dtype);

	  if (a.dtype === 'complex64') {
	    var aData = backend.texData.get(a.dataId);
	    var bData = backend.texData.get(b.dataId);
	    var realProgram = new BinaryOpComplexProgram(COMPLEX_MULTIPLY.REAL, a.shape, b.shape);
	    var imagProgram = new BinaryOpComplexProgram(COMPLEX_MULTIPLY.IMAG, a.shape, b.shape);
	    var _inputs = [{
	      dataId: aData.complexTensorInfos.real.dataId,
	      dtype: aData.complexTensorInfos.real.dtype,
	      shape: a.shape
	    }, {
	      dataId: aData.complexTensorInfos.imag.dataId,
	      dtype: aData.complexTensorInfos.imag.dtype,
	      shape: a.shape
	    }, {
	      dataId: bData.complexTensorInfos.real.dataId,
	      dtype: bData.complexTensorInfos.real.dtype,
	      shape: b.shape
	    }, {
	      dataId: bData.complexTensorInfos.imag.dataId,
	      dtype: bData.complexTensorInfos.imag.dtype,
	      shape: b.shape
	    }];
	    var realPart = backend.runWebGLProgram(realProgram, _inputs, 'float32');
	    var imagPart = backend.runWebGLProgram(imagProgram, _inputs, 'float32');
	    var complexOutput = complex$2({
	      inputs: {
	        real: realPart,
	        imag: imagPart
	      },
	      backend: backend
	    });
	    backend.disposeIntermediateTensorInfo(realPart);
	    backend.disposeIntermediateTensorInfo(imagPart); // TODO(annxingyuan): CPU forwarding for complex inputs.

	    return complexOutput;
	  }

	  if (backend.shouldExecuteOnCPU([a, b])) {
	    var _aData = backend.texData.get(a.dataId);

	    var _bData = backend.texData.get(b.dataId);

	    var _cpuMultiply = multiplyImplCPU(a.shape, b.shape, _aData.values, _bData.values, dtype),
	        outValues = _cpuMultiply[0],
	        outShape = _cpuMultiply[1];

	    var out = backend.makeTensorInfo(outShape, dtype);
	    var outData = backend.texData.get(out.dataId);
	    outData.values = outValues;
	    return out;
	  }

	  var program;

	  if (env().getBool('WEBGL_PACK_BINARY_OPERATIONS')) {
	    program = new BinaryOpPackedProgram(MUL, a.shape, b.shape);
	  } else {
	    program = new BinaryOpProgram(MUL, a.shape, b.shape);
	  }

	  return backend.runWebGLProgram(program, [a, b], dtype);
	}