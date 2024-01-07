function getPadding(node, tensorMap, context) {
	  var pad = getParamValue('pad', node, tensorMap, context);

	  if (pad === 'explicit') {
	    // This is 1d array, we need to convert it to 2d array
	    pad = getParamValue('explicitPaddings', node, tensorMap, context);
	    var explicitPadding = [[0, 0], [0, 0], [0, 0], [0, 0]];

	    for (var i = 0; i < 4; i++) {
	      explicitPadding[i][0] = pad[i * 2];
	      explicitPadding[i][1] = pad[i * 2 + 1];
	    }

	    return explicitPadding;
	  }

	  return pad;
	}