function computeFloat16ExponentTable() {
	  var exponentTable = new Uint32Array(64);
	  exponentTable[0] = 0;
	  exponentTable[31] = 0x47800000;
	  exponentTable[32] = 0x80000000;
	  exponentTable[63] = 0xc7800000;

	  for (var i = 1; i < 31; i++) {
	    exponentTable[i] = i << 23;
	  }

	  for (var _i5 = 33; _i5 < 63; _i5++) {
	    exponentTable[_i5] = 0x80000000 + (_i5 - 32 << 23);
	  }

	  return exponentTable;
	}