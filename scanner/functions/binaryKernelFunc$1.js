function binaryKernelFunc$1(_ref3) {
	  var opSnippet = _ref3.opSnippet,
	      packedOpSnippet = _ref3.packedOpSnippet,
	      _ref3$checkOutOfBound = _ref3.checkOutOfBounds,
	      checkOutOfBounds = _ref3$checkOutOfBound === void 0 ? false : _ref3$checkOutOfBound,
	      _ref3$supportsComplex = _ref3.supportsComplex,
	      supportsComplex = _ref3$supportsComplex === void 0 ? false : _ref3$supportsComplex,
	      cpuKernelImpl = _ref3.cpuKernelImpl,
	      dtype = _ref3.dtype;
	  return function (_ref4) {
	    var inputs = _ref4.inputs,
	        backend = _ref4.backend;
	    var a = inputs.a,
	        b = inputs.b;
	    var webglBackend = backend;

	    if (supportsComplex && a.dtype === 'complex64') {
	      var aData = webglBackend.texData.get(a.dataId);
	      var bData = webglBackend.texData.get(b.dataId);

	      var _map = [[aData.complexTensorInfos.real, bData.complexTensorInfos.real], [aData.complexTensorInfos.imag, bData.complexTensorInfos.imag]].map(function (complexParts) {
	        var aPart = complexParts[0],
	            bPart = complexParts[1];
	        var aHandle = {
	          dataId: aPart.dataId,
	          dtype: aPart.dtype,
	          shape: a.shape
	        };
	        var bHandle = {
	          dataId: bPart.dataId,
	          dtype: bPart.dtype,
	          shape: b.shape
	        };
	        var program = new BinaryOpProgram(opSnippet, a.shape, b.shape);
	        return webglBackend.runWebGLProgram(program, [aHandle, bHandle], upcastType(aPart.dtype, bPart.dtype));
	      }),
	          real = _map[0],
	          imag = _map[1];

	      var complexOutput = complex$2({
	        inputs: {
	          real: real,
	          imag: imag
	        },
	        backend: webglBackend
	      });
	      webglBackend.disposeIntermediateTensorInfo(real);
	      webglBackend.disposeIntermediateTensorInfo(imag); // TODO(annxingyuan): Implement CPU forwarding for complex inputs.

	      return complexOutput;
	    }

	    var $dtype = dtype || upcastType(a.dtype, b.dtype);

	    if (webglBackend.shouldExecuteOnCPU([a, b]) && cpuKernelImpl != null) {
	      var _aData = webglBackend.texData.get(a.dataId);

	      var _bData = webglBackend.texData.get(b.dataId);

	      var _cpuKernelImpl = cpuKernelImpl(a.shape, b.shape, _aData.values, _bData.values, $dtype),
	          outValues = _cpuKernelImpl[0],
	          outShape = _cpuKernelImpl[1];

	      var out = webglBackend.makeTensorInfo(outShape, $dtype);
	      var outData = webglBackend.texData.get(out.dataId);
	      outData.values = outValues;
	      return out;
	    }

	    var shouldUsePackedProgram = env().getBool('WEBGL_PACK_BINARY_OPERATIONS') && packedOpSnippet != null;
	    var program;

	    if (shouldUsePackedProgram) {
	      program = new BinaryOpPackedProgram(packedOpSnippet, a.shape, b.shape, checkOutOfBounds);
	    } else {
	      program = new BinaryOpProgram(opSnippet, a.shape, b.shape);
	    }

	    return webglBackend.runWebGLProgram(program, [a, b], $dtype);
	  };
	}