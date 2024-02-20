function fmtLong$1(ms) {
	  var msAbs = Math.abs(ms);

	  if (msAbs >= d$1) {
	    return plural$1(ms, msAbs, d$1, 'day');
	  }

	  if (msAbs >= h$1) {
	    return plural$1(ms, msAbs, h$1, 'hour');
	  }

	  if (msAbs >= m$1) {
	    return plural$1(ms, msAbs, m$1, 'minute');
	  }

	  if (msAbs >= s$1) {
	    return plural$1(ms, msAbs, s$1, 'second');
	  }

	  return ms + ' ms';
	}