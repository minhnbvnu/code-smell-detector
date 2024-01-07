function getSamplerScalar(inputInfo) {
	  var texName = inputInfo.name;
	  var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);

	  if (inputInfo.shapeInfo.isUniform) {
	    return "float " + funcName + "() {return " + texName + ";}";
	  }

	  var _inputInfo$shapeInfo$ = inputInfo.shapeInfo.texShape,
	      texNumR = _inputInfo$shapeInfo$[0],
	      texNumC = _inputInfo$shapeInfo$[1];

	  if (texNumR === 1 && texNumC === 1) {
	    return "\n      float " + funcName + "() {\n        return sampleTexture(" + texName + ", halfCR);\n      }\n    ";
	  }

	  var _inputInfo$shapeInfo$2 = inputInfo.shapeInfo.texShape,
	      tNumR = _inputInfo$shapeInfo$2[0],
	      tNumC = _inputInfo$shapeInfo$2[1];
	  var offset = getFlatOffsetUniformName(texName);
	  return "\n    float " + funcName + "() {\n      vec2 uv = uvFromFlat(" + tNumR + ", " + tNumC + ", " + offset + ");\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
	}