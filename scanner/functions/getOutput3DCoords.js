function getOutput3DCoords(shape, texShape) {
	  var coordsFromIndexSnippet = getLogicalCoordinatesFromFlatIndex(['r', 'c', 'd'], shape);
	  return "\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + texShape[0] + ", " + texShape[1] + "));\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n      " + coordsFromIndexSnippet + "\n      return ivec3(r, c, d);\n    }\n  ";
	}