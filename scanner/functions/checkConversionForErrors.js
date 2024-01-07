function checkConversionForErrors(vals, dtype) {
	  for (var i = 0; i < vals.length; i++) {
	    var num = vals[i];

	    if (isNaN(num) || !isFinite(num)) {
	      throw Error("A tensor of type " + dtype + " being uploaded contains " + num + ".");
	    }
	  }
	}