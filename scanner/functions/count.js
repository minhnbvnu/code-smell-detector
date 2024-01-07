function count(array, refernce) {
	  var counter = 0;

	  for (var _iterator = _createForOfIteratorHelperLoose(array), _step; !(_step = _iterator()).done;) {
	    var item = _step.value;

	    if (item === refernce) {
	      counter++;
	    }
	  }

	  return counter;
	}