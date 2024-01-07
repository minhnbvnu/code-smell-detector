function checkInputData(data, names, shapes, checkBatchAxis, exceptionPrefix) {
	  if (checkBatchAxis === void 0) {
	    checkBatchAxis = true;
	  }

	  if (exceptionPrefix === void 0) {
	    exceptionPrefix = '';
	  }

	  var arrays;

	  if (Array.isArray(data)) {
	    if (data.length !== names.length) {
	      throw new ValueError("Error when checking model " + exceptionPrefix + ": the Array of " + "Tensors that you are passing to your model is not the size the " + ("the model expected. Expected to see " + names.length + " Tensor(s),") + (" but instead got " + data.length + " Tensors(s)."));
	    }

	    arrays = data;
	  } else {
	    if (names.length > 1) {
	      throw new ValueError("The model expects " + names.length + " " + exceptionPrefix + " Tensors, " + "but only received one Tensor. Found: array with shape " + (JSON.stringify(data.shape) + "."));
	    }

	    arrays = [data];
	  }

	  if (shapes != null) {
	    for (var i = 0; i < names.length; ++i) {
	      if (shapes[i] == null) {
	        continue;
	      }

	      var array = arrays[i];

	      if (array.shape.length !== shapes[i].length) {
	        throw new ValueError("Error when checking " + exceptionPrefix + ": expected " + names[i] + " " + ("to have " + shapes[i].length + " dimension(s), but got array with ") + ("shape " + JSON.stringify(array.shape)));
	      }

	      for (var j = 0; j < shapes[i].length; ++j) {
	        if (j === 0 && !checkBatchAxis) {
	          continue;
	        }

	        var dim = array.shape[j];
	        var refDim = shapes[i][j];

	        if (refDim != null) {
	          if (refDim !== dim) {
	            throw new ValueError("Error when checking " + exceptionPrefix + ": expected " + (names[i] + " to have shape " + JSON.stringify(shapes[i]) + " but ") + ("got array with shape " + JSON.stringify(array.shape) + "."));
	          }
	        }
	      }
	    }
	  }
	}