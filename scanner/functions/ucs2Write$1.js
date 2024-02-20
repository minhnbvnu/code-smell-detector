function ucs2Write$1(buf, string, offset, length) {
	  return blitBuffer$1(utf16leToBytes$1(string, buf.length - offset), buf, offset, length);
	}