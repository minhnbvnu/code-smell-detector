function getPackedSamplerScalar(inputInfo) {
	  var texName = inputInfo.name;
	  var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
	  var glsl = getGlslDifferences();
	  return "\n    vec4 " + funcName + "() {\n      return " + glsl.texture2D + "(" + texName + ", halfCR);\n    }\n  ";
	}