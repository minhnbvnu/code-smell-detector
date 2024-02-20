function strlen(str) {
	  // Call the native functions if there's no surrogate char
	  if (!hasSurrogateUnit(str)) {
	    return str.length;
	  }

	  var len = 0;
	  for (var pos = 0; pos < str.length; pos += getUTF16Length(str, pos)) {
	    len++;
	  }
	  return len;
	}