function isPositionPrefix(smallPos, bigPos) {
	  if (bigPos.length < smallPos.length) {
	    return false;
	  }
	  // attention: "0-0-1" "0-0-10"
	  if (bigPos.length > smallPos.length && bigPos.charAt(smallPos.length) !== '-') {
	    return false;
	  }
	  return bigPos.substr(0, smallPos.length) === smallPos;
	}