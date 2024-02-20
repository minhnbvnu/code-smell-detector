function isError$1(e) {
	  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
	}