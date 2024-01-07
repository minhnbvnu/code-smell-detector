function getModelPathFromKey(key) {
	  var items = key.split(PATH_SEPARATOR);

	  if (items.length < 3) {
	    throw new Error("Invalid key format: " + key);
	  }

	  return items.slice(1, items.length - 1).join(PATH_SEPARATOR);
	}