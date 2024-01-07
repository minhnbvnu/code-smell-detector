function computeFloat16OffsetTable() {
	  var offsetTable = new Uint32Array(64);

	  for (var i = 0; i < 64; i++) {
	    offsetTable[i] = 1024;
	  }

	  offsetTable[0] = offsetTable[32] = 0;
	  return offsetTable;
	}