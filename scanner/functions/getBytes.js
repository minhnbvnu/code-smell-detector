function getBytes(dataView, startOffset, endOffset) {
	    var bytes = [];
	    for (var i = startOffset; i < endOffset; i += 1) {
	        bytes.push(dataView.getUint8(i));
	    }

	    return bytes;
	}