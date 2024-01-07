function getSampler6D(inputInfo) {
	  var shape = inputInfo.shapeInfo.logicalShape;
	  var texName = inputInfo.name;
	  var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);

	  var _util$squeezeShape5 = squeezeShape(shape),
	      newShape = _util$squeezeShape5.newShape,
	      keptDims = _util$squeezeShape5.keptDims;

	  if (newShape.length < shape.length) {
	    var newInputInfo = squeezeInputInfo(inputInfo, newShape);
	    var params = ['row', 'col', 'depth', 'depth2', 'depth3', 'depth4'];
	    return "\n      " + getSamplerFromInInfo(newInputInfo) + "\n      float " + funcName + "(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n      }\n    ";
	  }

	  var stride4 = shape[5];
	  var stride3 = shape[4] * stride4;
	  var stride2 = shape[3] * stride3;
	  var stride1 = shape[2] * stride2;
	  var stride0 = shape[1] * stride1;

	  if (inputInfo.shapeInfo.isUniform) {
	    // Uniform arrays will be less than 65505 (no risk of float16 overflow).
	    return "\n      float " + funcName + "(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n        int index = round(dot(\n          vec4(row, col, depth, depth2),\n          vec4(" + stride0 + ", " + stride1 + ", " + stride2 + ", " + stride3 + ")) +\n          dot(\n            vec2(depth3, depth4),\n            vec2(" + stride4 + ", 1)));\n        " + getUniformSampler(inputInfo) + "\n      }\n    ";
	  }

	  var flatOffset = inputInfo.shapeInfo.flatOffset;
	  var texShape = inputInfo.shapeInfo.texShape;
	  var texNumR = texShape[0];
	  var texNumC = texShape[1];

	  if (texNumC === stride0 && flatOffset == null) {
	    // texC is used directly as physical (no risk of float16 overflow).
	    return "\n      float " + funcName + "(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        int texR = row;\n        float texC = dot(vec4(col, depth, depth2, depth3),\n          vec4(" + stride1 + ", " + stride2 + ", " + stride3 + ", " + stride4 + ")) +\n               float(depth4);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
	  }

	  if (texNumC === stride4 && flatOffset == null) {
	    // texR is used directly as physical (no risk of float16 overflow).
	    return "\n      float " + funcName + "(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        float texR = dot(vec4(row, col, depth, depth2),\n          vec4(" + shape[1] * shape[2] * shape[3] * shape[4] + ",\n               " + shape[2] * shape[3] * shape[4] + ",\n               " + shape[3] * shape[4] + ",\n               " + shape[4] + ")) + float(depth3);\n        int texC = depth4;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
	  }

	  var offset = getFlatOffsetUniformName(texName);
	  return "\n    float " + funcName + "(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * " + stride0 + " + col * " + stride1 + " + depth * " + stride2 + " +\n          depth2 * " + stride3 + " + depth3 * " + stride4 + " + depth4 + " + offset + ";\n      vec2 uv = uvFromFlat(" + texNumR + ", " + texNumC + ", index);\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
	}