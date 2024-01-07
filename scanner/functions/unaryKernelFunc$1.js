function unaryKernelFunc$1(_ref) {
	  var opSnippet = _ref.opSnippet,
	      packedOpSnippet = _ref.packedOpSnippet,
	      cpuKernelImpl = _ref.cpuKernelImpl,
	      dtype = _ref.dtype;
	  return function (_ref2) {
	    var inputs = _ref2.inputs,
	        backend = _ref2.backend;
	    var x = inputs.x;
	    var webglBackend = backend;
	    var $dtype = dtype || x.dtype;

	    if (webglBackend.shouldExecuteOnCPU([x]) && cpuKernelImpl != null) {
	      var xData = webglBackend.texData.get(x.dataId);
	      var outValues = cpuKernelImpl(xData.values, $dtype);
	      return webglBackend.makeTensorInfo(x.shape, $dtype, outValues);
	    }

	    var shouldUsePackedProgram = env().getBool('WEBGL_PACK_UNARY_OPERATIONS') && packedOpSnippet != null;
	    var program;

	    if (shouldUsePackedProgram) {
	      program = new UnaryOpPackedProgram(x.shape, packedOpSnippet);
	    } else {
	      program = new UnaryOpProgram(x.shape, opSnippet);
	    }

	    return webglBackend.runWebGLProgram(program, [x], $dtype);
	  };
	}