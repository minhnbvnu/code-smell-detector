function sliceArraysByIndices(arrays, indices) {
	  return tidy(function () {
	    if (arrays == null) {
	      return null;
	    } else if (Array.isArray(arrays)) {
	      return arrays.map(function (array) {
	        return sliceArraysByIndices(array, indices);
	      });
	    } else {
	      // TODO(cais): indices should be a pre-constructed Tensor1D to avoid
	      //   tensor1d() calls.
	      return gather$1(arrays, indices.dtype === 'int32' ? indices : indices.toInt());
	    }
	  });
	}