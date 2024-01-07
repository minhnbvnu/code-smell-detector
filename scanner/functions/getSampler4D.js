function getSampler4D(inputInfo) {
	  var shape = inputInfo.shapeInfo.logicalShape;
	  var texName = inputInfo.name;
	  var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
	  var stride2 = shape[3];
	  var stride1 = shape[2] * stride2;
	  var stride0 = shape[1] * stride1;

	  var _util$squeezeShape3 = squeezeShape(shape),
	      newShape = _util$squeezeShape3.newShape,
	      keptDims = _util$squeezeShape3.keptDims;

	  if (newShape.length < shape.length) {
	    var newInputInfo = squeezeInputInfo(inputInfo, newShape);
	    var params = ['row', 'col', 'depth', 'depth2'];
	    return "\n      " + getSamplerFromInInfo(newInputInfo) + "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n      }\n    ";
	  }

	  if (inputInfo.shapeInfo.isUniform) {
	    // Uniform arrays will be less than 65505 (no risk of float16 overflow).
	    return "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        int index = round(dot(vec4(row, col, depth, depth2),\n                          vec4(" + stride0 + ", " + stride1 + ", " + stride2 + ", 1)));\n        " + getUniformSampler(inputInfo) + "\n      }\n    ";
	  }

	  var flatOffset = inputInfo.shapeInfo.flatOffset;
	  var texShape = inputInfo.shapeInfo.texShape;
	  var texNumR = texShape[0];
	  var texNumC = texShape[1];

	  if (texNumC === stride0 && flatOffset == null) {
	    // texC is used directly as physical (no risk of float16 overflow).
	    return "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        float texR = float(row);\n        float texC =\n            dot(vec3(col, depth, depth2),\n                vec3(" + stride1 + ", " + stride2 + ", 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
	  }

	  if (texNumC === stride2 && flatOffset == null) {
	    // texR is used directly as physical (no risk of float16 overflow).
	    return "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        float texR = dot(vec3(row, col, depth),\n                         vec3(" + shape[1] * shape[2] + ", " + shape[2] + ", 1));\n        float texC = float(depth2);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
	  }

	  var offset = getFlatOffsetUniformName(texName);
	  return "\n    float " + funcName + "(int row, int col, int depth, int depth2) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * " + stride0 + " + col * " + stride1 + " +\n          depth * " + stride2 + " + depth2;\n      vec2 uv = uvFromFlat(" + texNumR + ", " + texNumC + ", index + " + offset + ");\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
	}