function gather$1(reference, indices, axis) {
	  return tidy(function () {
	    if (Array.isArray(indices)) {
	      indices = tensor1d(indices, 'int32');
	    } else {
	      indices = indices.toInt();
	    }

	    return gather(reference, indices, axis);
	  });
	}