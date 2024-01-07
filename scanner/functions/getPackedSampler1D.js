function getPackedSampler1D(inputInfo) {
	  var texName = inputInfo.name;
	  var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
	  var texShape = inputInfo.shapeInfo.texShape;
	  var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
	  var glsl = getGlslDifferences();
	  return "\n    vec4 " + funcName + "(int index) {\n      vec2 uv = packedUVfrom1D(\n        " + packedTexShape[0] + ", " + packedTexShape[1] + ", index);\n      return " + glsl.texture2D + "(" + texName + ", uv);\n    }\n  ";
	}