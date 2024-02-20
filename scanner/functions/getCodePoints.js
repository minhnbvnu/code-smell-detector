function getCodePoints(str) {
	  var codePoints = [];
	  for (var pos = 0; pos < str.length; pos += getUTF16Length(str, pos)) {
	    codePoints.push(str.codePointAt(pos));
	  }
	  return codePoints;
	}