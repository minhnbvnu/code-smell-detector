function getOutput4DCoords(shape, texShape) {
	  var coordsFromIndexSnippet = getLogicalCoordinatesFromFlatIndex(['r', 'c', 'd', 'd2'], shape);
	  return "\n    ivec4 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(" + texShape[0] + ", " + texShape[1] + "));\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n      " + coordsFromIndexSnippet + "\n      return ivec4(r, c, d, d2);\n    }\n  ";
	}