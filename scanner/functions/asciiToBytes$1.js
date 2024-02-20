function asciiToBytes$1(str) {
	  var byteArray = [];

	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }

	  return byteArray;
	}