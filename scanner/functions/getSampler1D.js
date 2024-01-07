function getSampler1D(inputInfo) {
	  var texName = inputInfo.name;
	  var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);

	  if (inputInfo.shapeInfo.isUniform) {
	    // Uniform arrays will be less than 65505 (no risk of float16 overflow).
	    return "\n      float " + funcName + "(int index) {\n        " + getUniformSampler(inputInfo) + "\n      }\n    ";
	  }

	  var texShape = inputInfo.shapeInfo.texShape;
	  var tNumR = texShape[0];
	  var tNumC = texShape[1];

	  if (tNumC === 1 && tNumR === 1) {
	    return "\n      float " + funcName + "(int index) {\n        return sampleTexture(" + texName + ", halfCR);\n      }\n    ";
	  }

	  var offset = getFlatOffsetUniformName(texName);

	  if (tNumC === 1) {
	    return "\n      float " + funcName + "(int index) {\n        vec2 uv = vec2(0.5, (float(index + " + offset + ") + 0.5) / " + tNumR + ".0);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
	  }

	  if (tNumR === 1) {
	    return "\n      float " + funcName + "(int index) {\n        vec2 uv = vec2((float(index + " + offset + ") + 0.5) / " + tNumC + ".0, 0.5);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
	  }

	  return "\n    float " + funcName + "(int index) {\n      vec2 uv = uvFromFlat(" + tNumR + ", " + tNumC + ", index + " + offset + ");\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
	}