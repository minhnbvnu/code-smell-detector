function base64StringToArrayBuffer(str) {
	  if (useNodeBuffer) {
	    var buf = Buffer.from(str, 'base64');
	    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
	  }

	  var s = atob(str);
	  var buffer = new Uint8Array(s.length);

	  for (var i = 0; i < s.length; ++i) {
	    buffer.set([s.charCodeAt(i)], i);
	  }

	  return buffer.buffer;
	}