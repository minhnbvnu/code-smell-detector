function substr(str, start, length) {
	  start = start || 0;
	  length = length === undefined ? Infinity : length || 0;

	  // Call the native functions if there's no surrogate char
	  if (!hasSurrogateUnit(str)) {
	    return str.substr(start, length);
	  }

	  // Obvious cases
	  var size = str.length;
	  if (size <= 0 || start > size || length <= 0) {
	    return '';
	  }

	  // Find the actual starting position
	  var posA = 0;
	  if (start > 0) {
	    for (; start > 0 && posA < size; start--) {
	      posA += getUTF16Length(str, posA);
	    }
	    if (posA >= size) {
	      return '';
	    }
	  } else if (start < 0) {
	    for (posA = size; start < 0 && 0 < posA; start++) {
	      posA -= getUTF16Length(str, posA - 1);
	    }
	    if (posA < 0) {
	      posA = 0;
	    }
	  }

	  // Find the actual ending position
	  var posB = size;
	  if (length < size) {
	    for (posB = posA; length > 0 && posB < size; length--) {
	      posB += getUTF16Length(str, posB);
	    }
	  }

	  return str.substring(posA, posB);
	}