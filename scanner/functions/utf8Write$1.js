function utf8Write$1(buf, string, offset, length) {
	  return blitBuffer$1(utf8ToBytes$1(string, buf.length - offset), buf, offset, length);
	}