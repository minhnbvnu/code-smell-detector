function writeDouble$1(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754$1(buf, value, offset, 8);
	  }

	  write$1(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8;
	}