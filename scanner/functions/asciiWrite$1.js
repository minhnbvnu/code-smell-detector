function asciiWrite$1(buf, string, offset, length) {
	  return blitBuffer$1(asciiToBytes$1(string), buf, offset, length);
	}