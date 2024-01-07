function simpleAbsImpl(vals) {
	  var resultValues = new Float32Array(vals.length);

	  for (var i = 0; i < vals.length; ++i) {
	    resultValues[i] = Math.abs(vals[i]);
	  }

	  return resultValues;
	}