function arrayBufferToBase64String(buffer) {
	  if (useNodeBuffer) {
	    return Buffer.from(buffer).toString('base64');
	  }

	  var buf = new Uint8Array(buffer);
	  var s = '';

	  for (var i = 0, l = buf.length; i < l; i++) {
	    s += String.fromCharCode(buf[i]);
	  }

	  return btoa(s);
	}