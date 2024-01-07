function pad3d_(x, paddings, constantValue) {
	  if (constantValue === void 0) {
	    constantValue = 0;
	  }

	  assert(paddings.length === 3 && paddings[0].length === 2 && paddings[1].length === 2 && paddings[2].length === 2, function () {
	    return 'Invalid number of paddings. Must be length of 2 each.';
	  });
	  return pad(x, paddings, constantValue);
	}