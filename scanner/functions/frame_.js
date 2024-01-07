function frame_(signal, frameLength, frameStep, padEnd, padValue) {
	  if (padEnd === void 0) {
	    padEnd = false;
	  }

	  if (padValue === void 0) {
	    padValue = 0;
	  }

	  var start = 0;
	  var output = [];

	  while (start + frameLength <= signal.size) {
	    output.push(slice$2(signal, start, frameLength));
	    start += frameStep;
	  }

	  if (padEnd) {
	    while (start < signal.size) {
	      var padLen = start + frameLength - signal.size;
	      var pad = concat([slice$2(signal, start, frameLength - padLen), fill([padLen], padValue)]);
	      output.push(pad);
	      start += frameStep;
	    }
	  }

	  if (output.length === 0) {
	    return tensor2d([], [0, frameLength]);
	  }

	  return reshape(concat(output), [output.length, frameLength]);
	}