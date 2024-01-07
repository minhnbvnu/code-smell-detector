function getPackedSamplerND(inputInfo) {
	  var shape = inputInfo.shapeInfo.logicalShape;
	  var rank = shape.length;
	  var texName = inputInfo.name;
	  var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
	  var texShape = inputInfo.shapeInfo.texShape;
	  var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
	  var texNumR = packedTexShape[0];
	  var texNumC = packedTexShape[1];
	  var valuesPerRow = Math.ceil(shape[rank - 1] / 2);
	  var texelsInBatch = valuesPerRow * Math.ceil(shape[rank - 2] / 2);
	  var params = "int b, int row, int col";
	  var index = "b * " + texelsInBatch + " + (row / 2) * " + valuesPerRow + " + (col / 2)";

	  for (var b = 2; b < rank - 1; b++) {
	    params = "int b" + b + ", " + params;
	    texelsInBatch *= shape[rank - b - 1];
	    index = "b" + b + " * " + texelsInBatch + " + " + index;
	  }

	  var glsl = getGlslDifferences();
	  return "\n    vec4 " + funcName + "(" + params + ") {\n      int index = " + index + ";\n      int texR = index / " + texNumC + ";\n      int texC = index - texR * " + texNumC + ";\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(" + texNumC + ", " + texNumR + ");\n      return " + glsl.texture2D + "(" + texName + ", uv);\n    }\n  ";
	}