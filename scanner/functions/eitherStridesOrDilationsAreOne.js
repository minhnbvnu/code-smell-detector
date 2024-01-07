function eitherStridesOrDilationsAreOne(strides, dilations) {
	  return tupleValuesAreOne(strides) || tupleValuesAreOne(dilations);
	}