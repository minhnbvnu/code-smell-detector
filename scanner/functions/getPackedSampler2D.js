function getPackedSampler2D(inputInfo) {
	  var shape = inputInfo.shapeInfo.logicalShape;
	  var texName = inputInfo.name;
	  var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
	  var texShape = inputInfo.shapeInfo.texShape;
	  var texNumR = texShape[0];
	  var texNumC = texShape[1];
	  var glsl = getGlslDifferences();

	  if (texShape != null && arraysEqual(shape, texShape)) {
	    return "\n      vec4 " + funcName + "(int row, int col) {\n        vec2 uv = (vec2(col, row) + halfCR) / vec2(" + texNumC + ".0, " + texNumR + ".0);\n\n        return " + glsl.texture2D + "(" + texName + ", uv);\n      }\n    ";
	  }

	  var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
	  var valuesPerRow = Math.ceil(shape[1] / 2);
	  return "\n    vec4 " + funcName + "(int row, int col) {\n      vec2 uv = packedUVfrom2D(" + valuesPerRow + ", " + packedTexShape[0] + ", " + packedTexShape[1] + ", row, col);\n      return " + glsl.texture2D + "(" + texName + ", uv);\n    }\n  ";
	}