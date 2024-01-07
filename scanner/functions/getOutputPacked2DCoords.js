function getOutputPacked2DCoords(shape, texShape) {
	  var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];

	  if (arraysEqual(shape, texShape)) {
	    return "\n      ivec2 getOutputCoords() {\n        return 2 * ivec2(resultUV.yx * vec2(" + packedTexShape[0] + ", " + packedTexShape[1] + "));\n      }\n    ";
	  } // texels needed to accommodate a logical row


	  var texelsInLogicalRow = Math.ceil(shape[1] / 2);
	  /**
	   * getOutputCoords
	   *
	   * resTexRC: The rows and columns of the texels. If you move over one
	   * texel to the right in the packed texture, you are moving over one column
	   * (not two).
	   *
	   * index: The texel index
	   */

	  return "\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + packedTexShape[0] + ", " + packedTexShape[1] + "));\n\n      int index = resTexRC.x * " + packedTexShape[1] + " + resTexRC.y;\n      int r = 2 * (index / " + texelsInLogicalRow + ");\n      int c = imod(index, " + texelsInLogicalRow + ") * 2;\n\n      return ivec2(r, c);\n    }\n  ";
	}