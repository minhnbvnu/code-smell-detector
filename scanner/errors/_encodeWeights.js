	                            totalNumBytes = vals.reduce(function (p, c) {
	                              return p + c.length;
	                            }, 0) + NUM_BYTES_STRING_LENGTH * vals.length;