function enclosingPowerOfTwo(value) {
	  // Return 2**N for integer N such that 2**N >= value.
	  return Math.floor(Math.pow(2, Math.ceil(Math.log(value) / Math.log(2.0))));
	}