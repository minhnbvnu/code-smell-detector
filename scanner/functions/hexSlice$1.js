function hexSlice$1(buf, start, end) {
	  var len = buf.length;
	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;
	  var out = '';

	  for (var i = start; i < end; ++i) {
	    out += toHex$1(buf[i]);
	  }

	  return out;
	}