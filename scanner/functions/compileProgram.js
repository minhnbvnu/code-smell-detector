function compileProgram(gpgpu, program, inputs, output) {
	  var userCode = program.userCode;
	  var inputInfos = inputs.map(function (input, i) {
	    var shapeInfo = {
	      logicalShape: input.shape,
	      texShape: input.isUniform ? null : input.texData.texShape,
	      isUniform: input.isUniform,
	      isPacked: input.isUniform ? false : input.texData.isPacked,
	      flatOffset: null
	    };

	    if (input.texData != null && input.texData.slice != null && input.texData.slice.flatOffset > 0) {
	      shapeInfo.flatOffset = input.texData.slice.flatOffset;
	    }

	    return {
	      name: program.variableNames[i],
	      shapeInfo: shapeInfo
	    };
	  });
	  var inShapeInfos = inputInfos.map(function (x) {
	    return x.shapeInfo;
	  });
	  var outShapeInfo = {
	    logicalShape: output.shape,
	    texShape: output.texData.texShape,
	    isUniform: false,
	    isPacked: output.texData.isPacked,
	    flatOffset: null
	  };
	  var source = makeShader(inputInfos, outShapeInfo, userCode, program.packedInputs);
	  var webGLProgram = gpgpu.createProgram(source); // Add special uniforms (NAN, INFINITY)

	  var infLoc = null;
	  var nanLoc = gpgpu.getUniformLocation(webGLProgram, 'NAN', false);

	  if (env().getNumber('WEBGL_VERSION') === 1) {
	    infLoc = gpgpu.getUniformLocation(webGLProgram, 'INFINITY', false);
	  } // Add user-defined uniforms


	  var uniformLocations = {};

	  for (var i = 0; i < program.variableNames.length; i++) {
	    var varName = program.variableNames[i];
	    var shouldThrow = false;
	    uniformLocations[varName] = gpgpu.getUniformLocation(webGLProgram, varName, shouldThrow);
	    uniformLocations["offset" + varName] = gpgpu.getUniformLocation(webGLProgram, "offset" + varName, shouldThrow);
	  }

	  return {
	    program: program,
	    source: source,
	    webGLProgram: webGLProgram,
	    uniformLocations: uniformLocations,
	    inShapeInfos: inShapeInfos,
	    outShapeInfo: outShapeInfo,
	    infLoc: infLoc,
	    nanLoc: nanLoc
	  };
	}