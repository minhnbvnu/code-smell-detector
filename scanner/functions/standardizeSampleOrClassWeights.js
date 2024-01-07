function standardizeSampleOrClassWeights(xWeight, outputNames, weightType) {
	  var numOutputs = outputNames.length;

	  if (xWeight == null || Array.isArray(xWeight) && xWeight.length === 0) {
	    return outputNames.map(function (name) {
	      return null;
	    });
	  }

	  if (numOutputs === 1) {
	    if (Array.isArray(xWeight) && xWeight.length === 1) {
	      return xWeight;
	    } else if (typeof xWeight === 'object' && outputNames[0] in xWeight) {
	      return [xWeight[outputNames[0]]];
	    } else {
	      return [xWeight];
	    }
	  }

	  if (Array.isArray(xWeight)) {
	    if (xWeight.length !== numOutputs) {
	      throw new Error("Provided " + weightType + " is an array of " + xWeight.length + " " + ("element(s), but the model has " + numOutputs + " outputs. ") + "Make sure a set of weights is provided for each model output.");
	    }

	    return xWeight;
	  } else if (typeof xWeight === 'object' && Object.keys(xWeight).length > 0 && typeof xWeight[Object.keys(xWeight)[0]] === 'object') {
	    var output = [];
	    outputNames.forEach(function (outputName) {
	      if (outputName in xWeight) {
	        output.push(xWeight[outputName]);
	      } else {
	        output.push(null);
	      }
	    });
	    return output;
	  } else {
	    throw new Error("The model has multiple (" + numOutputs + ") outputs, " + ("so " + weightType + " must be either an array with ") + (numOutputs + " elements or an object with " + outputNames + " keys. ") + ("Provided " + weightType + " not understood: " + JSON.stringify(xWeight)));
	  }
	}