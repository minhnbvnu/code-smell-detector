function runProgram(gpgpu, binary, inputs, output, customSetup) {
	  validateBinaryAndProgram(binary.inShapeInfos, inputs);
	  validateBinaryAndProgram([binary.outShapeInfo], [output]);
	  var outTex = output.texData.texture;
	  var outTexShape = output.texData.texShape;

	  if (output.texData.isPacked) {
	    gpgpu.setOutputPackedMatrixTexture(outTex, outTexShape[0], outTexShape[1]);
	  } else {
	    gpgpu.setOutputMatrixTexture(outTex, outTexShape[0], outTexShape[1]);
	  }

	  gpgpu.setProgram(binary.webGLProgram); // Set special uniforms (NAN, INFINITY)

	  if (env().getNumber('WEBGL_VERSION') === 1) {
	    if (binary.infLoc !== null) {
	      gpgpu.gl.uniform1f(binary.infLoc, Infinity);
	    }
	  }

	  if (binary.nanLoc !== null) {
	    gpgpu.gl.uniform1f(binary.nanLoc, NaN);
	  } // Set user-defined inputs


	  inputs.forEach(function (input, i) {
	    var varName = binary.program.variableNames[i];
	    var varLoc = binary.uniformLocations[varName];
	    var varOffsetLoc = binary.uniformLocations["offset" + varName];

	    if (varLoc == null) {
	      // The compiler inferred that this variable is not used in this shader.
	      return;
	    }

	    if (input.isUniform) {
	      // Upload the values of the tensor as uniform.
	      if (sizeFromShape(input.shape) < 2) {
	        gpgpu.gl.uniform1f(varLoc, input.uniformValues[0]);
	      } else {
	        var vals = input.uniformValues;

	        if (!(vals instanceof Float32Array)) {
	          vals = new Float32Array(vals);
	        }

	        gpgpu.gl.uniform1fv(varLoc, vals);
	      }

	      return;
	    } // If the input was sliced, upload the flat offset index.


	    if (input.texData.slice != null && varOffsetLoc != null) {
	      gpgpu.gl.uniform1i(varOffsetLoc, input.texData.slice.flatOffset);
	    }

	    gpgpu.setInputMatrixTexture(input.texData.texture, varLoc, i);
	  });

	  if (customSetup != null) {
	    customSetup(gpgpu, binary.webGLProgram);
	  }

	  gpgpu.executeProgram();
	}