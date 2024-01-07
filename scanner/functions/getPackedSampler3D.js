function getPackedSampler3D(inputInfo) {
	  var shape = inputInfo.shapeInfo.logicalShape;
	  var texName = inputInfo.name;
	  var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
	  var texShape = inputInfo.shapeInfo.texShape;
	  var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];

	  if (shape[0] === 1) {
	    var squeezedShape = shape.slice(1);
	    var keptDims = [1, 2];
	    var newInputInfo = squeezeInputInfo(inputInfo, squeezedShape);
	    var params = ['b', 'row', 'col'];
	    return "\n        " + getPackedSamplerFromInInfo(newInputInfo) + "\n        vec4 " + funcName + "(int b, int row, int col) {\n          return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n        }\n      ";
	  }

	  var texNumR = packedTexShape[0];
	  var texNumC = packedTexShape[1];
	  var valuesPerRow = Math.ceil(shape[2] / 2);
	  var texelsInBatch = valuesPerRow * Math.ceil(shape[1] / 2);
	  var glsl = getGlslDifferences();
	  return "\n    vec4 " + funcName + "(int b, int row, int col) {\n      vec2 uv = packedUVfrom3D(\n        " + texNumR + ", " + texNumC + ", " + texelsInBatch + ", " + valuesPerRow + ", b, row, col);\n      return " + glsl.texture2D + "(" + texName + ", uv);\n    }\n  ";
	}