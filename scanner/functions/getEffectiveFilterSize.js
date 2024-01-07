function getEffectiveFilterSize(filterSize, dilation) {
	  if (dilation <= 1) {
	    return filterSize;
	  }

	  return filterSize + (filterSize - 1) * (dilation - 1);
	}