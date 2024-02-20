function _array_index(needle, haystack) {
	  var i,
	      len = haystack.length
	  for (i = 0; i < len; i++) {
		  if (haystack[i] === needle)
			  return i;
	  }
	  return -1;
  }