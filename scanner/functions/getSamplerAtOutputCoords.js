function getSamplerAtOutputCoords(inputInfo, outShapeInfo) {
	  var texName = inputInfo.name;
	  var texFuncSnippet = texName.charAt(0).toUpperCase() + texName.slice(1);
	  var funcName = 'get' + texFuncSnippet + 'AtOutCoords';
	  var outTexShape = outShapeInfo.texShape;
	  var inTexShape = inputInfo.shapeInfo.texShape;
	  var inRank = inputInfo.shapeInfo.logicalShape.length;
	  var outRank = outShapeInfo.logicalShape.length;

	  if (!inputInfo.shapeInfo.isUniform && inRank === outRank && inputInfo.shapeInfo.flatOffset == null && arraysEqual(inTexShape, outTexShape)) {
	    return "\n      float " + funcName + "() {\n        return sampleTexture(" + texName + ", resultUV);\n      }\n    ";
	  }

	  var type = getCoordsDataType(outRank);
	  var broadcastDims = getBroadcastDims$1(inputInfo.shapeInfo.logicalShape, outShapeInfo.logicalShape);
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

	  return "\n    float " + funcName + "() {\n      " + type + " coords = getOutputCoords();\n      " + coordsSnippet + "\n      return get" + texFuncSnippet + "(" + unpackedCoordsSnippet + ");\n    }\n  ";
	}