function fmtShort$1(ms) {
	  var msAbs = Math.abs(ms);

	  if (msAbs >= d$1) {
	    return Math.round(ms / d$1) + 'd';
	  }

	  if (msAbs >= h$1) {
	    return Math.round(ms / h$1) + 'h';
	  }

	  if (msAbs >= m$1) {
	    return Math.round(ms / m$1) + 'm';
	  }

	  if (msAbs >= s$1) {
	    return Math.round(ms / s$1) + 's';
	  }

	  return ms + 'ms';
	}