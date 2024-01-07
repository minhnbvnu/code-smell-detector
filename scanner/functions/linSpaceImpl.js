function linSpaceImpl(start, stop, num) {
	  var step = (stop - start) / (num - 1);
	  var values = makeZerosTypedArray(num, 'float32');
	  values[0] = start;

	  for (var i = 1; i < values.length; i++) {
	    values[i] = values[i - 1] + step;
	  }

	  return values;
	}