function withSpaceToBatchBasePaddings(filterShape, dilation) {
	  // Spatial dimensions of the filters and the upsampled filters in which we
	  // introduce (rate - 1) zeros between consecutive filter values.
	  var dilatedFilterShape = filterShape.map(function (s, i) {
	    return s + (s - 1) * (dilation[i] - 1);
	  });
	  var padExtraShape = dilatedFilterShape.map(function (s) {
	    return s - 1;
	  }); // When padding is odd, we pad more at end, following the same
	  // convention as conv2d.

	  var padExtraStart = padExtraShape.map(function (s) {
	    return Math.floor(s / 2);
	  });
	  var padExtraEnd = padExtraShape.map(function (s, i) {
	    return s - padExtraStart[i];
	  });
	  return padExtraShape.map(function (_, i) {
	    return [padExtraStart[i], padExtraEnd[i]];
	  });
	}