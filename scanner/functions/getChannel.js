function getChannel(channels) {
	    var inCoordsArray = xShape.map(function (_, i) {
	      return getInCoord(i, channels);
	    });
	    var inCoords = inCoordsArray.join(',');
	    var innerDims = inCoordsArray.slice(-2).join(',');
	    return "getChannel(getX(" + inCoords + "), vec2(" + innerDims + "))";
	  }