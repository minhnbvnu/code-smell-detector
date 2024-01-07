function bytesFromStringArray(arr) {
	  if (arr == null) {
	    return 0;
	  }

	  var bytes = 0;
	  arr.forEach(function (x) {
	    return bytes += x.length;
	  });
	  return bytes;
	}