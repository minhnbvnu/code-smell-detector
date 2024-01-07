function getFusedBiasGradient(bias, dyActivation) {
	  var res = dyActivation;
	  var reduceAxes = getReductionAxes(bias.shape, dyActivation.shape);

	  if (reduceAxes.length > 0) {
	    res = sum$1(res, reduceAxes);
	  }

	  return reshape(res, bias.shape);
	}