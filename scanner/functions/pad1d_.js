function pad1d_(x, paddings, constantValue) {
	  if (constantValue === void 0) {
	    constantValue = 0;
	  }

	  assert(paddings.length === 2, function () {
	    return 'Invalid number of paddings. Must be length of 2.';
	  });
	  return pad(x, [paddings], constantValue);
	}