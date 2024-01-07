function split$2(arr, size) {
	  var res = [];

	  for (var i = 0; i < arr.length; i += size) {
	    res.push(arr.slice(i, i + size));
	  }

	  return res;
	}