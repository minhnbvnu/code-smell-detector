function objectWriteUInt16$1(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;

	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
	  }
	}