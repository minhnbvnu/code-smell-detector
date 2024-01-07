function computeFloat16MantisaTable() {
	  var convertMantissa = function convertMantissa(i) {
	    var m = i << 13;
	    var e = 0;

	    while ((m & 0x00800000) === 0) {
	      e -= 0x00800000;
	      m <<= 1;
	    }

	    m &= ~0x00800000;
	    e += 0x38800000;
	    return m | e;
	  };

	  var mantisaTable = new Uint32Array(2048);
	  mantisaTable[0] = 0;

	  for (var i = 1; i < 1024; i++) {
	    mantisaTable[i] = convertMantissa(i);
	  }

	  for (var _i4 = 1024; _i4 < 2048; _i4++) {
	    mantisaTable[_i4] = 0x38000000 + (_i4 - 1024 << 13);
	  }

	  return mantisaTable;
	}