function base64Write$1(buf, string, offset, length) {
	  return blitBuffer$1(base64ToBytes$1(string), buf, offset, length);
	}