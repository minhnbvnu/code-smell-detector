function sliceAlongFirstAxis(array, start, size) {
	  return tidy(function () {
	    switch (array.rank) {
	      case 1:
	        return slice1d(array, start, size);

	      case 2:
	        return slice2d(array, [start, 0], [size, array.shape[1]]);

	      case 3:
	        return slice3d(array, [start, 0, 0], [size, array.shape[1], array.shape[2]]);

	      case 4:
	        return slice4d(array, [start, 0, 0, 0], [size, array.shape[1], array.shape[2], array.shape[3]]);

	      case 5:
	        return slice$2(array, [start, 0, 0, 0, 0], [size, array.shape[1], array.shape[2], array.shape[3], array.shape[4]]);

	      case 6:
	        return slice$2(array, [start, 0, 0, 0, 0, 0], [size, array.shape[1], array.shape[2], array.shape[3], array.shape[4], array.shape[5]]);

	      default:
	        throw new ValueError("sliceAlongFirstAxis() received an unsupported tensor rank: " + ("" + array.rank));
	    }
	  });
	}