function iteratorFromIncrementing(start) {
	  var i = start;
	  return iteratorFromFunction(function () {
	    return {
	      value: i++,
	      done: false
	    };
	  });
	}