function sliceAlongLastAxis(array, start, size) {
	  return tidy(function () {
	    switch (array.rank) {
	      case 1:
	        return slice1d(array, start, size);

	      case 2:
	        return slice2d(array, [0, start], [array.shape[0], size]);

	      case 3:
	        return slice3d(array, [0, 0, start], [array.shape[0], array.shape[1], size]);

	      case 4:
	        return slice4d(array, [0, 0, 0, start], [array.shape[0], array.shape[1], array.shape[2], size]);

	      default:
	        throw new ValueError("sliceAlongLastAxis() received an unsupported tensor rank: " + ("" + array.rank));
	    }
	  });
	}