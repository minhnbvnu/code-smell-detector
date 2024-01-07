function normalizeArray(value, n, name) {
	  if (typeof value === 'number') {
	    return pyListRepeat(value, n);
	  } else {
	    if (value.length !== n) {
	      throw new ValueError("The " + name + " argument must be an integer or tuple of " + n + " integers." + (" Received: " + value.length + " elements."));
	    }

	    for (var i = 0; i < n; ++i) {
	      var singleValue = value[i];

	      if (!isInteger$1(singleValue)) {
	        throw new ValueError("The " + name + " argument must be an integer or tuple of " + n + (" integers. Received: " + JSON.stringify(value) + " including a") + (" non-integer number " + singleValue));
	      }
	    }

	    return value;
	  }
	}