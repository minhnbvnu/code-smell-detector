function convertToTensorArray(arg, argName, functionName, parseAsDtype) {
	  if (parseAsDtype === void 0) {
	    parseAsDtype = 'numeric';
	  }

	  if (!Array.isArray(arg)) {
	    throw new Error("Argument " + argName + " passed to " + functionName + " must be a " + '`Tensor[]` or `TensorLike[]`');
	  }

	  var tensors = arg;
	  return tensors.map(function (t, i) {
	    return convertToTensor(t, argName + "[" + i + "]", functionName, parseAsDtype);
	  });
	}