function makeOnesTypedArray(size, dtype) {
	  var array = makeZerosTypedArray(size, dtype);

	  for (var i = 0; i < array.length; i++) {
	    array[i] = 1;
	  }

	  return array;
	}