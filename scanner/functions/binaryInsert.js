function binaryInsert(arr, element, comparator) {
	  var index = binarySearch(arr, element, comparator);
	  var insertionPoint = index < 0 ? -(index + 1) : index;
	  arr.splice(insertionPoint, 0, element);
	}