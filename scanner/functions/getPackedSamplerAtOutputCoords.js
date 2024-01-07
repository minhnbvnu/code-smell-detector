function getPackedSamplerAtOutputCoords(inputInfo, outShapeInfo) {
	  var texName = inputInfo.name;
	  var texFuncSnippet = texName.charAt(0).toUpperCase() + texName.slice(1);
	  var funcName = 'get' + texFuncSnippet + 'AtOutCoords';
	  var inRank = inputInfo.shapeInfo.logicalShape.length;
	  var outRank = outShapeInfo.logicalShape.length;
	  var broadcastDims = getBroadcastDims$1(inputInfo.shapeInfo.logicalShape, outShapeInfo.logicalShape);
	  var type = getCoordsDataType(outRank);
	  var rankDiff = outRank - inRank;
	  var coordsSnippet;
	  var fields = ['x', 'y', 'z', 'w', 'u', 'v'];

	  if (inRank === 0) {
	    coordsSnippet = '';
	  } else if (outRank < 2 && broadcastDims.length >= 1) {
	    coordsSnippet = 'coords = 0;';
	  } else {
	    coordsSnippet = broadcastDims.map(function (d) {
	      return "coords." + fields[d + rankDiff] + " = 0;";
	    }).join('\n');
	  }

	  var unpackedCoordsSnippet = '';

	  if (outRank < 2 && inRank > 0) {
	    unpackedCoordsSnippet = 'coords';
	  } else {
	    unpackedCoordsSnippet = inputInfo.shapeInfo.logicalShape.map(function (s, i) {
	      return "coords." + fields[i + rankDiff];
	    }).join(', ');
	  }

	  var output = "return outputValue;";
	  var inSize = sizeFromShape(inputInfo.shapeInfo.logicalShape);
	  var isInputScalar = inSize === 1;
	  var outSize = sizeFromShape(outShapeInfo.logicalShape);
	  var isOutputScalar = outSize === 1;

	  if (inRank === 1 && !isInputScalar && !isOutputScalar) {
	    output = "\n      return vec4(outputValue.xy, outputValue.xy);\n    ";
	  } else if (isInputScalar && !isOutputScalar) {
	    if (outRank === 1) {
	      output = "\n        return vec4(outputValue.x, outputValue.x, 0., 0.);\n      ";
	    } else {
	      output = "\n        return vec4(outputValue.x);\n      ";
	    }
	  } else if (broadcastDims.length) {
	    var rows = inRank - 2;
	    var cols = inRank - 1;

	    if (broadcastDims.indexOf(rows) > -1 && broadcastDims.indexOf(cols) > -1) {
	      output = "return vec4(outputValue.x);";
	    } else if (broadcastDims.indexOf(rows) > -1) {
	      output = "return vec4(outputValue.x, outputValue.y, " + "outputValue.x, outputValue.y);";
	    } else if (broadcastDims.indexOf(cols) > -1) {
	      output = "return vec4(outputValue.xx, outputValue.zz);";
	    }
	  }

	  return "\n    vec4 " + funcName + "() {\n      " + type + " coords = getOutputCoords();\n      " + coordsSnippet + "\n      vec4 outputValue = get" + texFuncSnippet + "(" + unpackedCoordsSnippet + ");\n      " + output + "\n    }\n  ";
	}