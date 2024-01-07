function getOutputPacked1DCoords(shape, texShape) {
	  var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];

	  if (packedTexShape[0] === 1) {
	    return "\n      int getOutputCoords() {\n        return 2 * int(resultUV.x * " + packedTexShape[1] + ".0);\n      }\n    ";
	  }

	  if (packedTexShape[1] === 1) {
	    return "\n      int getOutputCoords() {\n        return 2 * int(resultUV.y * " + packedTexShape[0] + ".0);\n      }\n    ";
	  }

	  return "\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + packedTexShape[0] + ", " + packedTexShape[1] + "));\n      return 2 * (resTexRC.x * " + packedTexShape[1] + " + resTexRC.y);\n    }\n  ";
	}