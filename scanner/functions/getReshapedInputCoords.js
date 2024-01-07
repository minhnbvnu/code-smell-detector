function getReshapedInputCoords(shape) {
	  var coordsFromIndexSnippet = getLogicalCoordinatesFromFlatIndex(['r', 'c', 'd'], shape);
	  return "\n    ivec3 inputCoordsFromReshapedOutCoords(int index) {\n      " + coordsFromIndexSnippet + "\n      return ivec3(r, c, d);\n    }\n  ";
	}