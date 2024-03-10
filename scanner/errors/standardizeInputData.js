function standardizeInputData(data, names, shapes, checkBatchAxis, exceptionPrefix) {
	  if (checkBatchAxis === void 0) {
	    checkBatchAxis = true;
	  }

	  if (exceptionPrefix === void 0) {
	    exceptionPrefix = '';
	  }

	  if (names == null || names.length === 0) {
	    // Check for the case where the model expected no data, but some data got
	    // sent.
	    if (data != null) {
	      var gotUnexpectedData = false;

	      if (isDataArray(data) && data.length > 0) {
	        gotUnexpectedData = true;
	      } else if (isDataDict(data)) {
	        for (var key in data) {
	          if (data.hasOwnProperty(key)) {
	            gotUnexpectedData = true;
	            break;
	          }
	        }
	      } else {
	        // `data` is a singleton Tensor in this case.
	        gotUnexpectedData = true;
	      }

	      if (gotUnexpectedData) {
	        throw new ValueError("Error when checking model " + exceptionPrefix + " expected no data, " + ("but got " + data));
	      }
	    }

	    return [];
	  }

	  if (data == null) {
	    return names.map(function (name) {
	      return null;
	    });
	  }

	  var arrays;

	  if (isDataDict(data)) {
	    data = data;
	    arrays = [];

	    for (var _iterator = _createForOfIteratorHelperLoose(names), _step; !(_step = _iterator()).done;) {
	      var name = _step.value;

	      if (data[name] == null) {
	        throw new ValueError("No data provided for \"" + name + "\". Need data for each key in: " + ("" + names));
	      }

	      arrays.push(data[name]);
	    }
	  } else if (isDataArray(data)) {
	    data = data;

	    if (data.length !== names.length) {
	      throw new ValueError("Error when checking model " + exceptionPrefix + ": the Array of " + "Tensors that you are passing to your model is not the size the " + ("model expected. Expected to see " + names.length + " Tensor(s), but ") + ("instead got the following list of Tensor(s): " + data));
	    }

	    arrays = data;
	  } else {
	    data = data;

	    if (names.length > 1) {
	      throw new ValueError("The model " + exceptionPrefix + " expects " + names.length + " Tensor(s), " + ("but only received one Tensor. Found: Tensor with shape " + data.shape));
	    }

	    arrays = [data];
	  }

	  arrays = ensureTensorsRank2OrHigher(arrays); // Check shape compatibility.

	  if (shapes != null) {
	    for (var i = 0; i < names.length; ++i) {
	      if (shapes[i] == null) {
	        continue;
	      }

	      var array = arrays[i];

	      if (array.shape.length !== shapes[i].length) {
	        throw new ValueError("Error when checking " + exceptionPrefix + ": expected " + names[i] + " " + ("to have " + shapes[i].length + " dimension(s). but got array with ") + ("shape " + array.shape));
	      }

	      for (var j = 0; j < shapes[i].length; ++j) {
	        if (j === 0 && !checkBatchAxis) {
	          // Skip the first (batch) axis.
	          continue;
	        }

	        var dim = array.shape[j];
	        var refDim = shapes[i][j];

	        if (refDim != null && refDim >= 0 && dim !== refDim) {
	          throw new ValueError("Error when checking " + exceptionPrefix + ": expected " + names[i] + " " + ("to have shape [" + shapes[i] + "], but got array with shape ") + ("[" + array.shape + "]."));
	        }
	      }
	    }
	  }

	  return arrays;
	}