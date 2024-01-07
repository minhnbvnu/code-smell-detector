function binarySearch_(arr, target, comparator) {
	  var left = 0;
	  var right = arr.length;
	  var middle = 0;
	  var found = false;

	  while (left < right) {
	    middle = left + (right - left >>> 1);
	    var compareResult = comparator(target, arr[middle]);

	    if (compareResult > 0) {
	      left = middle + 1;
	    } else {
	      right = middle; // If compareResult is 0, the value is found. We record it is found,
	      // and then keep looking because there may be duplicate.

	      found = !compareResult;
	    }
	  }

	  return found ? left : -left - 1;
	}