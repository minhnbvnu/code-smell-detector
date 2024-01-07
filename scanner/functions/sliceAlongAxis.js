function sliceAlongAxis(array, start, size, axis) {
	  return tidy(function () {
	    switch (array.rank) {
	      case 1:
	        return slice1d(array, start, size);

	      case 2:
	        switch (axis) {
	          case 1:
	            return sliceAlongFirstAxis(array, start, size);

	          case 2:
	            return sliceAlongLastAxis(array, start, size);

	          default:
	            throw new ValueError("The axis is not within the rank of the tensor " + ("" + axis));
	        }

	      case 3:
	        switch (axis) {
	          case 1:
	            return sliceAlongFirstAxis(array, start, size);

	          case 2:
	            return slice3d(array, [0, start, 0], [array.shape[0], size, array.shape[2]]);

	          case 3:
	            return sliceAlongLastAxis(array, start, size);

	          default:
	            throw new ValueError("The axis is not within the rank of the tensor " + ("" + axis));
	        }

	      case 4:
	        switch (axis) {
	          case 1:
	            return sliceAlongFirstAxis(array, start, size);

	          case 2:
	            return slice4d(array, [0, start, 0, 0], [array.shape[0], size, array.shape[2], array.shape[3]]);

	          case 3:
	            return slice4d(array, [0, 0, start, 0], [array.shape[0], array.shape[1], size, array.shape[3]]);

	          case 4:
	            return sliceAlongLastAxis(array, start, size);

	          default:
	            throw new ValueError("The axis is not within the rank of the tensor " + ("" + axis));
	        }

	      default:
	        throw new ValueError("sliceAlongLastAxis() received an unsupported tensor rank: " + ("" + array.rank));
	    }
	  });
	}