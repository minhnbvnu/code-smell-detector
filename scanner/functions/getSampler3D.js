function getSampler3D(inputInfo) {
	  var shape = inputInfo.shapeInfo.logicalShape;
	  var texName = inputInfo.name;
	  var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
	  var stride0 = shape[1] * shape[2];
	  var stride1 = shape[2];

	  var _util$squeezeShape2 = squeezeShape(shape),
	      newShape = _util$squeezeShape2.newShape,
	      keptDims = _util$squeezeShape2.keptDims;

	  var squeezedShape = newShape;

	  if (squeezedShape.length < shape.length) {
	    var newInputInfo = squeezeInputInfo(inputInfo, squeezedShape);
	    var params = ['row', 'col', 'depth'];
	    return "\n        " + getSamplerFromInInfo(newInputInfo) + "\n        float " + funcName + "(int row, int col, int depth) {\n          return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n        }\n      ";
	  }

	  if (inputInfo.shapeInfo.isUniform) {
	    // Uniform arrays will be less than 65505 (no risk of float16 overflow).
	    return "\n      float " + funcName + "(int row, int col, int depth) {\n        int index = round(dot(vec3(row, col, depth),\n                          vec3(" + stride0 + ", " + stride1 + ", 1)));\n        " + getUniformSampler(inputInfo) + "\n      }\n    ";
	  }

	  var texShape = inputInfo.shapeInfo.texShape;
	  var texNumR = texShape[0];
	  var texNumC = texShape[1];
	  var flatOffset = inputInfo.shapeInfo.flatOffset;

	  if (texNumC === stride0 && flatOffset == null) {
	    // texC is used directly as physical (no risk of float16 overflow).
	    return "\n        float " + funcName + "(int row, int col, int depth) {\n          float texR = float(row);\n          float texC = dot(vec2(col, depth), vec2(" + stride1 + ", 1));\n          vec2 uv = (vec2(texC, texR) + halfCR) /\n                     vec2(" + texNumC + ".0, " + texNumR + ".0);\n          return sampleTexture(" + texName + ", uv);\n        }\n      ";
	  }

	  if (texNumC === stride1 && flatOffset == null) {
	    // texR is used directly as physical (no risk of float16 overflow).
	    return "\n    float " + funcName + "(int row, int col, int depth) {\n      float texR = dot(vec2(row, col), vec2(" + shape[1] + ", 1));\n      float texC = float(depth);\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(" + texNumC + ".0, " + texNumR + ".0);\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
	  }

	  var offset = getFlatOffsetUniformName(texName);
	  return "\n      float " + funcName + "(int row, int col, int depth) {\n        // Explicitly use integer operations as dot() only works on floats.\n        int index = row * " + stride0 + " + col * " + stride1 + " + depth + " + offset + ";\n        vec2 uv = uvFromFlat(" + texNumR + ", " + texNumC + ", index);\n        return sampleTexture(" + texName + ", uv);\n      }\n  ";
	}