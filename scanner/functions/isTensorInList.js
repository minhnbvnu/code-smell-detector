function isTensorInList(tensor, tensorList) {
	  return tensorList.some(function (x) {
	    return x.id === tensor.id;
	  });
	}