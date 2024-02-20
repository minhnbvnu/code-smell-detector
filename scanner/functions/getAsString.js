function getAsString(buf) {
		var ret = [];
		var strLen = Math.min(buf.length, 1024*1024); // not all the buffer
		for (var i = 0; i < strLen; i++) {
			ret.push( String.fromCharCode(buf[i]) );
		}
		return ret.join("");
	}