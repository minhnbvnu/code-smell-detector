function utf16leToBytes$1(str, units) {
	  var c, hi, lo;
	  var byteArray = [];

	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break;
	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray;
	}