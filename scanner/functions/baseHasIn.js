function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}