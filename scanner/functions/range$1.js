function range$1(begin, end) {
	  if (end < begin) {
	    throw new ValueError("end (" + end + ") < begin (" + begin + ") is forbidden.");
	  }

	  var out = [];

	  for (var i = begin; i < end; ++i) {
	    out.push(i);
	  }

	  return out;
	}