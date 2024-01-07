function getOutputPackedNDCoords(shape, texShape) {
	  var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
	  var texelsInLogicalRow = Math.ceil(shape[shape.length - 1] / 2);
	  var texelsInBatch = texelsInLogicalRow * Math.ceil(shape[shape.length - 2] / 2);
	  var texelsInBatchN = texelsInBatch;
	  var batches = "";
	  var coords = 'b, r, c';

	  for (var b = 2; b < shape.length - 1; b++) {
	    texelsInBatchN *= shape[shape.length - b - 1];
	    batches = "\n      int b" + b + " = index / " + texelsInBatchN + ";\n      index -= b" + b + " * " + texelsInBatchN + ";\n    " + batches;
	    coords = "b" + b + ", " + coords;
	  }

	  return "\n    ivec" + shape.length + " getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + packedTexShape[0] + ", " + packedTexShape[1] + "));\n      int index = resTexRC.x * " + packedTexShape[1] + " + resTexRC.y;\n\n      " + batches + "\n\n      int b = index / " + texelsInBatch + ";\n      index -= b * " + texelsInBatch + ";\n\n      int r = 2 * (index / " + texelsInLogicalRow + ");\n      int c = imod(index, " + texelsInLogicalRow + ") * 2;\n\n      return ivec" + shape.length + "(" + coords + ");\n    }\n  ";
	}