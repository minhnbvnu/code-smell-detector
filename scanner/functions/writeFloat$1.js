function writeFloat$1(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754$1(buf, value, offset, 4);
	  }

	  write$1(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4;
	}