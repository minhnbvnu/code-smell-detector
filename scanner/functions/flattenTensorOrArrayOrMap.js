function flattenTensorOrArrayOrMap(inputOrOutput, names, values) {
	  if (values instanceof Tensor) {
	    return [values];
	  } else if (Array.isArray(values)) {
	    assert(values.length === names.length, function () {
	      return "Received an array of " + values.length + " Tensors, but expected " + names.length + " to match the " + inputOrOutput + " keys " + names + ".";
	    });
	    return values;
	  } else {
	    var result = []; // Check that all the required keys are available.

	    for (var _iterator = _createForOfIteratorHelperLoose(names), _step; !(_step = _iterator()).done;) {
	      var name = _step.value;

	      if (values[name] == null) {
	        throw new ValueError("The feature data generated by the dataset lacks the required " + (inputOrOutput + " key '" + name + "'."));
	      }

	      result.push(values[name]);
	    }

	    return result;
	  }
	}