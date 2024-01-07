function linearSearchLastTrue(arr) {
	  var i = 0;

	  for (; i < arr.length; ++i) {
	    var isDone = arr[i]();

	    if (!isDone) {
	      break;
	    }
	  }

	  return i - 1;
	}