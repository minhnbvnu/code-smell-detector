function temporalPadding(x, padding) {
	  return tidy(function () {
	    if (x.rank !== 3) {
	      throw new ValueError("temporalPadding expects input tensor to be 3-D, but received a " + (x.rank + "-D tensor."));
	    }

	    if (padding == null) {
	      padding = [1, 1];
	    }

	    if (padding.length !== 2) {
	      throw new ValueError("temporalPadding expects input padding pattern to be a length-2 " + ("array, but received a length-" + padding.length + " array."));
	    }

	    var pattern = [[0, 0], padding, [0, 0]];
	    return pad(x, pattern);
	  });
	}