function arrayProd(array, begin, end) {
	  if (begin == null) {
	    begin = 0;
	  }

	  if (end == null) {
	    end = array.length;
	  }

	  var prod = 1;

	  for (var i = begin; i < end; ++i) {
	    prod *= array[i];
	  }

	  return prod;
	}