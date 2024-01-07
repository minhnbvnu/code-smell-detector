function cosineWindow(windowLength, a, b) {
	  var even = 1 - windowLength % 2;
	  var newValues = new Float32Array(windowLength);

	  for (var i = 0; i < windowLength; ++i) {
	    var cosArg = 2.0 * Math.PI * i / (windowLength + even - 1);
	    newValues[i] = a - b * Math.cos(cosArg);
	  }

	  return tensor1d(newValues, 'float32');
	}