function getOutputPacked3DCoords(shape, texShape) {
	  var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
	  var texelsInLogicalRow = Math.ceil(shape[2] / 2);
	  var texelsInBatch = texelsInLogicalRow * Math.ceil(shape[1] / 2);
	  return "\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + packedTexShape[0] + ", " + packedTexShape[1] + "));\n      int index = resTexRC.x * " + packedTexShape[1] + " + resTexRC.y;\n\n      int b = index / " + texelsInBatch + ";\n      index -= b * " + texelsInBatch + ";\n\n      int r = 2 * (index / " + texelsInLogicalRow + ");\n      int c = imod(index, " + texelsInLogicalRow + ") * 2;\n\n      return ivec3(b, r, c);\n    }\n  ";
	}