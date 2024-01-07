function deepZip(inputs, zipFn) {
	  if (zipFn === void 0) {
	    zipFn = zipToList;
	  }

	  return deepZipInternal(inputs, zipFn);
	}