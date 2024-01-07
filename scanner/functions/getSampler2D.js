function getSampler2D(inputInfo) {
	  var shape = inputInfo.shapeInfo.logicalShape;
	  var texName = inputInfo.name;
	  var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
	  var texShape = inputInfo.shapeInfo.texShape;

	  if (texShape != null && arraysEqual(shape, texShape)) {
	    var _texNumR = texShape[0];
	    var _texNumC = texShape[1];
	    return "\n    float " + funcName + "(int row, int col) {\n      vec2 uv = (vec2(col, row) + halfCR) / vec2(" + _texNumC + ".0, " + _texNumR + ".0);\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
	  }

	  var _util$squeezeShape = squeezeShape(shape),
	      newShape = _util$squeezeShape.newShape,
	      keptDims = _util$squeezeShape.keptDims;

	  var squeezedShape = newShape;

	  if (squeezedShape.length < shape.length) {
	    var newInputInfo = squeezeInputInfo(inputInfo, squeezedShape);
	    var params = ['row', 'col'];
	    return "\n      " + getSamplerFromInInfo(newInputInfo) + "\n      float " + funcName + "(int row, int col) {\n        return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n      }\n    ";
	  }

	  if (inputInfo.shapeInfo.isUniform) {
	    // Uniform arrays will be less than 65505 (no risk of float16 overflow).
	    return "\n      float " + funcName + "(int row, int col) {\n        int index = round(dot(vec2(row, col), vec2(" + shape[1] + ", 1)));\n        " + getUniformSampler(inputInfo) + "\n      }\n    ";
	  }

	  var texNumR = texShape[0];
	  var texNumC = texShape[1];
	  var offset = getFlatOffsetUniformName(texName);

	  if (texNumC === 1) {
	    // index is used directly as physical (no risk of float16 overflow).
	    return "\n    float " + funcName + "(int row, int col) {\n      float index = dot(vec3(row, col, " + offset + "), vec3(" + shape[1] + ", 1, 1));\n      vec2 uv = vec2(0.5, (index + 0.5) / " + texNumR + ".0);\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
	  }

	  if (texNumR === 1) {
	    // index is used directly as physical (no risk of float16 overflow).
	    return "\n    float " + funcName + "(int row, int col) {\n      float index = dot(vec3(row, col, " + offset + "), vec3(" + shape[1] + ", 1, 1));\n      vec2 uv = vec2((index + 0.5) / " + texNumC + ".0, 0.5);\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
	  }

	  return "\n  float " + funcName + "(int row, int col) {\n    // Explicitly use integer operations as dot() only works on floats.\n    int index = row * " + shape[1] + " + col + " + offset + ";\n    vec2 uv = uvFromFlat(" + texNumR + ", " + texNumC + ", index);\n    return sampleTexture(" + texName + ", uv);\n  }\n";
	}