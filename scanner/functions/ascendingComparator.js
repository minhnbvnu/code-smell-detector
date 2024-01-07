function ascendingComparator(c1, c2) {
	  // For objects with same scores, we make the object with the larger index go
	  // first. In an array that pops from the end, this means that the object with
	  // the smaller index will be popped first. This ensures the same output as
	  // the TensorFlow python version.
	  return c1.score - c2.score || c1.score === c2.score && c2.boxIndex - c1.boxIndex;
	}