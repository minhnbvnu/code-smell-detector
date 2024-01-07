function isDataDict(x) {
	  return !isDataTensor(x) && !isDataArray(x);
	}