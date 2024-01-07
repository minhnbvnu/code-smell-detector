function createUnionTypeAnnotation(types) {
	  var flattened = removeTypeDuplicates(types);

	  if (flattened.length === 1) {
	    return flattened[0];
	  } else {
	    return t.unionTypeAnnotation(flattened);
	  }
	}