function dropout_(x, rate, noiseShape, seed) {
	  var $x = convertToTensor(x, 'x', 'dropout');
	  assert($x.dtype === 'float32', function () {
	    return "x has to be a floating point tensor since it's going to be " + ("scaled, but got a " + $x.dtype + " tensor instead.");
	  });
	  assert(rate >= 0 && rate < 1, function () {
	    return "rate must be a float in the range [0, 1), but got " + rate + ".";
	  });

	  if (rate === 0) {
	    return x instanceof Tensor ? $x.clone() : $x;
	  }

	  var $noiseShape = getNoiseShape($x, noiseShape);
	  var keepProb = 1 - rate;
	  var multiplier = div(floor$a(add$1(randomUniform($noiseShape, 0, 1, 'float32', seed), keepProb)), keepProb);
	  return mul($x, multiplier);
	}