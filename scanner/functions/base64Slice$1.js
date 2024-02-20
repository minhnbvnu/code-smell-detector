function base64Slice$1(buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return fromByteArray$1(buf);
	  } else {
	    return fromByteArray$1(buf.slice(start, end));
	  }
	}