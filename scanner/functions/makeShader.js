function makeShader(inputsInfo, outputShape, userCode, usesPackedTextures) {
	  var prefixSnippets = [];
	  inputsInfo.forEach(function (x) {
	    var size = sizeFromShape(x.shapeInfo.logicalShape); // Snippet when we decided to upload the values as uniform.

	    if (x.shapeInfo.isUniform) {
	      prefixSnippets.push("uniform float " + x.name + (size > 1 ? "[" + size + "]" : '') + ";");
	    } else {
	      prefixSnippets.push("uniform sampler2D " + x.name + ";");
	      prefixSnippets.push("uniform int offset" + x.name + ";");
	    }
	  });
	  var inputPrefixSnippet = prefixSnippets.join('\n');
	  var inputSamplingSnippet = inputsInfo.map(function (x) {
	    return getInputSamplingSnippet(x, outputShape, usesPackedTextures);
	  }).join('\n');
	  var outTexShape = outputShape.texShape;
	  var glsl = getGlslDifferences();
	  var floatTextureSampleSnippet = getFloatTextureSampleSnippet(glsl);
	  var outputSamplingSnippet;
	  var floatTextureSetOutputSnippet;
	  var shaderPrefix = getShaderPrefix(glsl);

	  if (outputShape.isPacked) {
	    outputSamplingSnippet = getPackedOutputSamplingSnippet(outputShape.logicalShape, outTexShape);
	    floatTextureSetOutputSnippet = getFloatTextureSetRGBASnippet(glsl);
	  } else {
	    outputSamplingSnippet = getOutputSamplingSnippet(outputShape.logicalShape, outTexShape);
	    floatTextureSetOutputSnippet = getFloatTextureSetRSnippet(glsl);
	  }

	  if (usesPackedTextures) {
	    shaderPrefix += SHADER_PACKED_PREFIX;
	  }

	  var source = [shaderPrefix, floatTextureSampleSnippet, floatTextureSetOutputSnippet, inputPrefixSnippet, outputSamplingSnippet, inputSamplingSnippet, userCode].join('\n');
	  return source;
	}