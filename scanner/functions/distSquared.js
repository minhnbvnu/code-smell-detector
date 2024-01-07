function distSquared(a, b) {
	  var result = 0;

	  for (var i = 0; i < a.length; i++) {
	    var diff = Number(a[i]) - Number(b[i]);
	    result += diff * diff;
	  }

	  return result;
	}