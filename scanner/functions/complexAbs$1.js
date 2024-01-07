function complexAbs$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var x = inputs.x;
	  var xData = backend.texData.get(x.dataId);
	  var program = new ComplexAbsProgram(x.shape);
	  var programInputs = [makeComplexComponentTensorInfo(x, xData.complexTensorInfos.real), makeComplexComponentTensorInfo(x, xData.complexTensorInfos.imag)];
	  return backend.runWebGLProgram(program, programInputs, programInputs[0].dtype);
	}